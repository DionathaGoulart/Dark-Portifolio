# GitHub Secrets Configuration

This document outlines the required secrets for the CI/CD pipeline to work properly with Vercel deployment.

## 🔐 Required Secrets

Add these secrets in your GitHub repository settings under **Settings > Secrets and variables > Actions**:

### VERCEL_TOKEN
- **Description**: Your Vercel API token
- **How to get**: 
  1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
  2. Click "Create Token"
  3. Give it a name (e.g., "GitHub Actions")
  4. Copy the generated token
- **Required for**: All Vercel deployments

### VERCEL_ORG_ID
- **Description**: Your Vercel organization/team ID
- **How to get**:
  1. Go to your Vercel dashboard
  2. Click on your team/organization name
  3. Go to Settings > General
  4. Copy the "Team ID" or "Organization ID"
- **Required for**: All Vercel deployments

### VERCEL_PROJECT_ID
- **Description**: Your Vercel project ID
- **How to get**:
  1. Go to your project in Vercel dashboard
  2. Go to Settings > General
  3. Copy the "Project ID"
- **Required for**: All Vercel deployments

### VERCEL_SCOPE
- **Description**: Your Vercel team/user scope
- **How to get**:
  1. This is usually your Vercel username or team name
  2. Can be found in your Vercel profile or team settings
- **Required for**: All Vercel deployments

## 🚀 Setting Up Secrets

### Step 1: Access Repository Settings
1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** > **Actions**

### Step 2: Add Each Secret
1. Click **New repository secret**
2. Enter the secret name (e.g., `VERCEL_TOKEN`)
3. Enter the secret value
4. Click **Add secret**
5. Repeat for all required secrets

### Step 3: Verify Secrets
After adding all secrets, you should see:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID  
- ✅ VERCEL_PROJECT_ID
- ✅ VERCEL_SCOPE

## 🔄 Workflow Behavior

### On Push to `main` branch:
1. ✅ Run tests
2. ✅ Build application
3. ✅ Deploy to Vercel **Production**

### On Push to `develop` branch:
1. ✅ Run tests
2. ✅ Build application
3. ❌ No deployment (develop branch)

### On Pull Request:
1. ✅ Run tests
2. ✅ Build application
3. ✅ Deploy to Vercel **Preview** (for review)

## 🛠️ Troubleshooting

### Common Issues

#### "Vercel token is invalid"
- Check that `VERCEL_TOKEN` is correct
- Ensure the token hasn't expired
- Verify the token has the right permissions

#### "Project not found"
- Check that `VERCEL_PROJECT_ID` is correct
- Ensure the project exists in your Vercel account
- Verify you have access to the project

#### "Organization not found"
- Check that `VERCEL_ORG_ID` is correct
- Ensure you're using the right organization/team ID
- Verify you have access to the organization

#### "Scope not found"
- Check that `VERCEL_SCOPE` matches your username or team name
- Ensure there are no typos in the scope name

### Debugging Steps

1. **Check Workflow Logs**:
   - Go to Actions tab in your repository
   - Click on the failed workflow
   - Look for error messages in the logs

2. **Verify Secrets**:
   - Go to Settings > Secrets and variables > Actions
   - Ensure all secrets are present and correctly named

3. **Test Vercel Connection**:
   - Try deploying manually from Vercel dashboard
   - Ensure your project builds successfully

4. **Check Permissions**:
   - Verify your Vercel account has the right permissions
   - Ensure the token has access to the project

## 📝 Additional Notes

- Secrets are encrypted and only visible to repository administrators
- Secrets are not visible in workflow logs (they show as `***`)
- You can update secret values at any time
- Deleting a secret will cause workflows to fail

## 🔗 Useful Links

- [Vercel API Documentation](https://vercel.com/docs/api)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
