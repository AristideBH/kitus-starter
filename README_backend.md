# Setting up Directus backend

> _This README provides instructions for setting up and configuring the backend of our project, which uses Directus as the content management system._

## Requirements

- Node.js and pnpm installed on your local machine
- A VPS running [Docker](https://docs.docker.com/engine/install/) & [CapRover](https://caprover.com/docs/get-started.html)
- A GitHub account
- Cloned this repository and pushed it to your GitHub repositories

## Install via One-click Apps

1. Head over to your CapRover dashboard, and navigate to the **Apps**,

2. Click on **One-Click Apps/Databases**, search for `Directus`, and select the second one (Not **Directus + MySQL + Redis**),

3. Fill in the field as follows:

   - App Name : `admin`
   - Directus image tag : `10.13.1` (last tested version)
   - Directus admin user email & password : your desired credentials

4. Click on **Deploy** and wait for the installation to complete.

## Advanced configuration

In the **Apps** section, select your `admin` application.

### HTTP Settings :

- Enable HTTPS, and force redirection to HTTPS
- **Save & Restart** your app

### App Configs :

1. Toggle **Bulk Edit** and add the following making sure to fill in your own variables :

   ```sh
   PUBLIC_URL=******************
   TELEMETRY=false
   MARKETPLACE_TRUST=all
   DB_POOL__Min=0
   DB_POOL__MAX=7
   RATE_LIMITER_ENABLED=true

   CORS_ENABLED=true
   CORS_ORIGIN=http://localhost:5173,******************

   EMAIL_SMTP_POOL=true
   EMAIL_TEMPLATES_PATH=./templates
   EMAIL_FROM=******************
   EMAIL_TRANSPORT=smtp
   EMAIL_SMTP_HOST=******************
   EMAIL_SMTP_PORT=****
   EMAIL_SMTP_USER=******************
   EMAIL_SMTP_PASSWORD=******************

   CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC=https://www.youtube-nocookie.com,https://player.vimeo.com
   CONTENT_SECURITY_POLICY_DIRECTIVES__SCRIPT_SRC=array:'self', player.vimeo.com 'unsafe-eval', www.youtube.com 'unsafe-eval', www.youtube.com/iframe_api 'unsafe-eval'
   CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC=array:'self' data:, i.ytimg.com 'unsafe-eval'
   CONTENT_SECURITY_POLICY_DIRECTIVES__MEDIA_SRC=array:'self', cdn.plyr.io
   ```

   For more configuration options, see [Directus documentation](https://docs.directus.io/self-hosted/config-options.html)

2. Add a persistent diretory for the email templates :

   - **Path in App** : `/directus/templates`
   - **Label** : `admin-templates

3. **Save & Restart** your app

### Directus update and Sharp module installation

- Head over the **Deployment** tab of your `admin` app,
- Find **Method 4: Deploy plain Dockerfile**
- Copy the following code and update the `FROM` tag ([Directus releases](https://hub.docker.com/r/directus/directus/tags))

  ```Dockerfile
  FROM directus/directus:10.13.1

  USER root
  RUN corepack enable
  USER node
  RUN pnpm add sharp
  ```

  You can now access Directus at the URL provided in the **HTTP Settings** tab.

## Installing extensions and generate admin token

1. In your Directus instance, head over **Settings > Marketplace** and install the following extensions:
   - [Flexible editor](https://github.com/formfcw/directus-extension-flexible-editor)
   - [Directus Sync](https://github.com/tractr/directus-sync)
   - [Hierarchy Layout](https://github.com/codihaus/directus-extension-hierarchy-layout.git)
   - [Display Link](https://github.com/formfcw/directus-extension-flexible-editor.git)
   - [SEO](https://github.com/codihaus/directus-extension-seo.git)
   - [Thumbhash](https://github.com/WoLfulus/directus-extension-thumbhash)
2. Head over the Admin User account page and generate a new token
3. Update the `.env` file in the root of your project with the token you generated, and the `PUBLIC_DIRECTUS_URL` variable

## Template push

We can now push the template data to Directus.

Change directory to the `frontend` folder and run :

```bash
pnpm pushSchema
```

The default data will be pushed to the database and you can now expand your schema in the Directus interface.
