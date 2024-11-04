# Setting up Sveltekit frontend

> _This README provides instructions for setting up and configuring the frontend of our project, which uses Svelte 5 as web framework._

## Requirements

- `Node.js` and `pnpm` installed on your local machine
- A GitHub account
- Cloned this repository and pushed it to your GitHub repositories

## Deploy Sveltekit in Caprover via GitHub

For detailed informations, see [Automatic Deploy using Github, Bitbucket and etc.](https://caprover.com/docs/deployment-methods.html#automatic-deploy-using-github-bitbucket-and-etc)

Head over to your CapRover dashboard, and navigate to the **Apps** section

1.  Name your app `frontend` and click on **Create new app**
2.  Head over to the **HTTP Settings** tab
    - Enable HTTPS and force redirection to HTTPS on default domain
    - Add a HTTPS redirection to your main domain
    - Set **Redirect all domains to** the main domain.
    - Edit the **Container HTTP port** to `3000`
    - **Save & Restart** your app
3.  Head over to the **App Configs** tab

    - Toggle **Bulk Edit** and add the following making sure to fill in your own variables :
      ```sh
      PUBLIC_DIRECTUS_URL=***directus_admin_url***
      PUBLIC_COOKIE_DOMAIN=***sveltekit_frontend_url***
      ```
    - **Save & Restart** your app

4.  Head over to the **Deployment** tab

    - Find **Method 3: Deploy from Github/Bitbucket/Gitlab**
    - Fill in the required fields :

      - **repo** : This is the main HTTPS address of repo, in case of github, it is in `github.com/someone/something` format. Make sure it does NOT include `https://` prefix and `.git` suffix.
      - **branch** : The branch you want to be tracked, for example master or staging or release...
      - **github/bitbucket username(email address)** : This is username that will be used when Captain downloads the repo.
      - **github/bitbucket password** : You can enter any non-empty text, like 123456, for public projects.
      - Or, instead of username/password, use SSH Key:

        Make sure to use PEM format as other formats may not work. Use the following command if unsure:

        ```bash
        ssh-keygen -m PEM -t ed25519 -C "yourname@example.com" -f ./deploykey -q -N ""
        ```

    - **Save & Restart** your app, then copy the newly generated webhook

5.  Head to your GitHub repository and create a webhook in Settings > Add Webhook
    - **URL** : Captain Webhook from your apps page,
    - **Content Type** : `application/json`,
    - **Secret** : empty ,
    - **Event** : Just the push event.

## Pull schema types from Directus

Change directory to the `frontend` folder and run :

```bash
pnpm pullTypes
```
