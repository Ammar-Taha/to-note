/**
 * Test Script: Verify Email OTP Template Variables
 * 
 * This script sends a real OTP email to test that {{ .Token }} 
 * is properly replaced with a 6-digit code.
 * 
 * Usage:
 * 1. Set your Supabase credentials below
 * 2. Run: node test/test-email-otp.js
 * 3. Check the email inbox for the test email
 */

const SUPABASE_URL = 'YOUR_SUPABASE_URL' // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'
const TEST_EMAIL = 'your-test-email@example.com'

async function testEmailOTP() {
  console.log('🧪 Testing Email OTP Template Variables...\n')
  
  try {
    // Send OTP email
    console.log(`📧 Sending OTP to: ${TEST_EMAIL}`)
    
    const response = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: TEST_EMAIL,
        create_user: false, // Don't create account, just send OTP
      }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log('✅ OTP email sent successfully!')
      console.log('\n📬 Check your inbox at:', TEST_EMAIL)
      console.log('\n🔍 What to look for:')
      console.log('   - Should see: "Enter this code: 123456" (6 digits)')
      console.log('   - Should NOT see: "Enter this code: {{ .Token }}"')
      console.log('\n✨ If you see 6 digits, the template is working correctly!')
    } else {
      console.error('❌ Failed to send OTP:', data)
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run the test
testEmailOTP()
