#!/bin/bash
git push https://$AZURE_LOGIN:$AZURE_PASSWORD@snackreactor.scm.azurewebsites.net/snackreactor.git master

echo "Finished Azure push successfully."
