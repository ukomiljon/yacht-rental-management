import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { IEmailConfig } from '../configs/interfaces';
import { OAuth2Client } from 'google-auth-library';


import {
  IUser,
  successResponse,
  ITemplatedData,
  ITemplates,
} from './interfaces';

@Injectable()
export class MailerService {
  private readonly loggerService: LoggerService;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly refreshToken: string;
  private readonly userEmail: string;
  private readonly email: string;
  private readonly domain: string;
  private readonly service: string;
  private readonly host: string;
  private readonly port: number;
  private readonly templates: ITemplates;
  private readonly oauth2Client: OAuth2Client;
  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<IEmailConfig>('emailService');
    this.email = `"Yacht" <${emailConfig.auth.user}>`;
    this.domain = this.configService.get<string>('domain');
    this.host = emailConfig.host;
    this.port = emailConfig.port;
    this.service = emailConfig.service;
    this.clientId = emailConfig.auth.clientId;
    this.clientSecret = emailConfig.auth.clientSecret;
    this.redirectUrl = emailConfig.auth.redirectUrl;
    this.refreshToken = emailConfig.auth.refreshToken;
    this.userEmail = emailConfig.auth.user;
    this.loggerService = new Logger(MailerService.name);
    this.templates = {
      confirmation: MailerService.parseTemplate('confirmation.hbs'),
      resetPassword: MailerService.parseTemplate('reset-password.hbs'),
    };

    console.log("emailConfig:",emailConfig);

    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUrl // The URL to redirect after authorization
    );
    
  }

  private static parseTemplate(
    templateName: string,
  ): Handlebars.TemplateDelegate<ITemplatedData> {
    const templateText = readFileSync(
      join(__dirname, 'templates', templateName),
      'utf-8',
    );
    return Handlebars.compile<ITemplatedData>(templateText, { strict: true });
  } 

  async getAccessToken(): Promise<string | null> {
    try {
      const { token } = await this.oauth2Client.getAccessToken();
      console.log(`getAccessToken token: ${token}`);
      return token || null;
    } catch (error) {
      console.error('Error retrieving access token', error);
      return null;
    }
  }

  private async createTransporter() {
    // Create a new Oauth2Client
    // const oauth2Client = new google.auth.OAuth2(
    //   this.clientId,
    //   this.clientSecret,
    //   this.redirectUrl,
    // );

    console.log(`this.clientId: ${this.clientId}`);
    console.log(`this.clientSecret: ${this.clientSecret}`);
    console.log(`this.redirectUrl: ${this.redirectUrl}`);
    // console.log(`oauth2Client: ${oauth2Client}`);

    // set the refresh token to your Oauth2Client
    this.oauth2Client.setCredentials({ refresh_token: this.refreshToken });

     // Get your access token
    const accessToken = await this.getAccessToken();

    console.log(`accessToken: ${accessToken}`);

    try { 

      // create a new transporter with the necessary details of your Oauth2
      const transporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
        // secure: true, // true for 465, false for other ports
        auth: {
          type: 'OAuth2',
          user: this.userEmail,
          accessToken,
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          refreshToken: this.refreshToken,
        },
      });

      console.log(`transporter: ${transporter}`);

      // To verify if email transport was successful
      transporter.verify((err: any, success: any) => {
        if (err) {
          console.log('Verification error' + err);
          return;
        }
        console.log(`=== Server is ready to take messages: ${success} ===`);
      });

      return transporter;
    } catch (err) {
      console.log(err);
    }
  }

  public async sendConfirmationEmail(
    user: IUser,
    token: string,
  ): Promise<successResponse> {
    const { email, name } = user;

    console.log("user-->", user);

    const subject = 'Confirm your email';
    const html = this.templates.confirmation({
      name,
      link: `http://${this.domain}/api/v1/auth/confirm-email/${token}`,
    });
    await this.sendEmail(
      email,
      subject,
      html,
      'A new confirmation email was sent.',
    );

    return { response: 'confirmation email sent successfully' };
  }

  public async sendResetPasswordEmail(
    user: IUser,
    token: string,
  ): Promise<successResponse> {
    const { email, name } = user;
    const subject = 'Reset your password';
    const html = this.templates.resetPassword({
      name,
      link: `https://${this.domain}/auth/reset-password/${token}`,
    });
    await this.sendEmail(
      email,
      subject,
      html,
      'A new reset password email was sent.',
    );

    return { response: 'password reset email sent successfully' };
  }

  public async sendEmail(
    to: string,
    subject: string,
    html: string,
    log?: string,
  ): Promise<void> {

    console.log("sendEmail--->");

    const transporter = await this.createTransporter();

    if (!transporter) {
      throw new Error('Transporter is not available');
    }

    if (!transporter.sendMail) {
      throw new Error('Transporter doesnt have sendMail');
    }

    transporter
      .sendMail({
        from: this.email,
        to,
        subject,
        html,
      })
      .then(() => this.loggerService.log(log ?? 'A new email was sent.'))
      .catch((error) => this.loggerService.error(error));
  }
}
