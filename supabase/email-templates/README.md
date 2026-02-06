# ToNote Email Templates 📧

Professional, branded HTML email templates for Supabase authentication.

## 📋 Templates Included

1. **01-confirm-signup.html** - Welcome email with email confirmation
2. **02-magic-link.html** - Passwordless login magic link
3. **03-reset-password.html** - Password reset with security warning
4. **04-invite-user.html** - User invitation with feature highlights
5. **05-change-email.html** - Email address change confirmation
6. **06-reauthentication.html** - Reauthentication with large OTP display

## 🎨 Design Features

- ✅ **ToNote branding** - Matches landing page aesthetic
- ✅ **Responsive design** - Works on all email clients
- ✅ **Inline CSS** - Compatible with Gmail, Outlook, Apple Mail
- ✅ **600px max-width** - Email-safe dimensions
- ✅ **Professional typography** - System fonts with fallbacks
- ✅ **Clear CTAs** - Prominent blue buttons (#3b82f6)
- ✅ **OTP support** - Includes 6-digit codes to avoid email prefetching
- ✅ **Security warnings** - Yellow notice boxes for sensitive actions
- ✅ **Brand colors** - Gradient header with ToNote blue

## 🚀 How to Install

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Email Templates**
3. For each template:
   - Select the template type (Confirm signup, Magic Link, etc.)
   - Copy the HTML content from the corresponding `.html` file
   - Paste into the template editor
   - Update the subject line using `subjects.json`
   - Click **Save**

### Option 2: Management API

Use the Supabase Management API to update all templates at once:

```bash
# Set your credentials
$SUPABASE_ACCESS_TOKEN = "your-access-token"  # Get from https://supabase.com/dashboard/account/tokens
$PROJECT_REF = "your-project-ref"

# Read template files
$confirmSignup = Get-Content -Path "01-confirm-signup.html" -Raw
$magicLink = Get-Content -Path "02-magic-link.html" -Raw
$resetPassword = Get-Content -Path "03-reset-password.html" -Raw
$inviteUser = Get-Content -Path "04-invite-user.html" -Raw
$changeEmail = Get-Content -Path "05-change-email.html" -Raw
$reauthentication = Get-Content -Path "06-reauthentication.html" -Raw

# Create JSON payload
$body = @{
  mailer_subjects_confirmation = "Welcome to ToNote! Confirm your email"
  mailer_templates_confirmation_content = $confirmSignup
  
  mailer_subjects_magic_link = "Your ToNote Magic Link"
  mailer_templates_magic_link_content = $magicLink
  
  mailer_subjects_recovery = "Reset your ToNote password"
  mailer_templates_recovery_content = $resetPassword
  
  mailer_subjects_invite = "You've been invited to ToNote"
  mailer_templates_invite_content = $inviteUser
  
  mailer_subjects_email_change = "Confirm your new email address"
  mailer_templates_email_change_content = $changeEmail
  
  mailer_subjects_reauthentication = "ToNote verification code"
  mailer_templates_reauthentication_content = $reauthentication
} | ConvertTo-Json

# Update templates
Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/$PROJECT_REF/config/auth" `
  -Method PATCH `
  -Headers @{
    "Authorization" = "Bearer $SUPABASE_ACCESS_TOKEN"
    "Content-Type" = "application/json"
  } `
  -Body $body
```

### Option 3: Local Development

For self-hosted Supabase or local development, update your `config.toml`:

```toml
[auth.email.template.confirmation]
subject = "Welcome to ToNote! Confirm your email"
content_path = "./supabase/email-templates/01-confirm-signup.html"

[auth.email.template.magic_link]
subject = "Your ToNote Magic Link"
content_path = "./supabase/email-templates/02-magic-link.html"

[auth.email.template.recovery]
subject = "Reset your ToNote password"
content_path = "./supabase/email-templates/03-reset-password.html"

[auth.email.template.invite]
subject = "You've been invited to ToNote"
content_path = "./supabase/email-templates/04-invite-user.html"

[auth.email.template.email_change]
subject = "Confirm your new email address"
content_path = "./supabase/email-templates/05-change-email.html"

[auth.email.template.reauthentication]
subject = "ToNote verification code"
content_path = "./supabase/email-templates/06-reauthentication.html"
```

## 🔐 Supabase Variables Used

Each template uses the following Supabase template variables:

- `{{ .ConfirmationURL }}` - Full confirmation link
- `{{ .Token }}` - 6-digit OTP code (prevents email prefetching)
- `{{ .SiteURL }}` - Your app URL (https://to-note.vercel.app)
- `{{ .Email }}` - User's email address
- `{{ .NewEmail }}` - New email (change-email template only)

## ⚠️ Important Notes

1. **Email Prefetching**: Templates include both `{{ .ConfirmationURL }}` buttons AND `{{ .Token }}` OTP codes to prevent Microsoft Defender and other security tools from consuming links prematurely.

2. **Redirect URLs**: Ensure `https://to-note.vercel.app` is added to your Supabase project's allowed redirect URLs:
   - Go to **Authentication** > **URL Configuration**
   - Add your production URL to the redirect allowlist

3. **Testing**: After uploading, test each template by:
   - Signing up a new user
   - Requesting a password reset
   - Sending a magic link
   - etc.

4. **Customization**: Feel free to modify the templates to match your brand further. All inline CSS is compatible with major email clients.

## 📱 Mobile-Friendly

All templates use:
- Responsive table-based layout
- `max-width: 600px` for optimal mobile display
- Large touch-friendly buttons (14px+ padding)
- Readable font sizes (16px+ for body text)

## 🎯 Email Client Compatibility

Tested and working on:
- ✅ Gmail (Web, iOS, Android)
- ✅ Apple Mail (macOS, iOS)
- ✅ Outlook (Web, Desktop, Mobile)
- ✅ Yahoo Mail
- ✅ ProtonMail
- ✅ Thunderbird

## 📞 Support

If you encounter issues:
1. Check the Supabase Auth logs for errors
2. Verify template variables are correctly formatted
3. Test email sending with a real email address
4. Check spam/junk folders

## 📝 License

These templates are part of the ToNote project and can be freely modified for your needs.

---

**Created for ToNote** - A modern, minimal note-taking app
