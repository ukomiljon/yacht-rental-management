Steps in PowerShell:
Check if the Folder Contains a .git Directory In PowerShell, use the following command to check if the microservices/openai-service/ folder contains a .git directory (indicating it’s a Git repository or submodule):

powershell
Copy code
Get-ChildItem -Force microservices/openai-service
If you see a .git folder listed, that’s the cause of the error.

Remove the .git Folder from the openai-service To remove the .git folder in PowerShell, use:

powershell
Copy code
Remove-Item -Recurse -Force microservices/openai-service\.git
This command will delete the .git folder, making openai-service part of your main repository instead of being treated as a submodule.

Add the Folder to Git After removing the .git folder inside openai-service, you can now add the folder to your repository:

powershell
Copy code
git add microservices/openai-service/
Commit the Changes Once the folder is successfully added, commit the changes:

powershell
Copy code
git commit -m "Add openai-service folder to repository"
Push the Changes to the Remote Repository Finally, push the committed changes:

powershell
Copy code
git push origin main