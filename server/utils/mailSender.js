const https = require("https")
 
const mailSender = async (email, title, body) => {
  const data = JSON.stringify({
    sender: { name: "GyanSetu", email: process.env.BREVO_SENDER_EMAIL },
    to: [{ email: email }],
    subject: title,
    htmlContent: body,
  })
 
  const options = {
    hostname: "api.brevo.com",
    path: "/v3/smtp/email",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "Content-Length": Buffer.byteLength(data),
    },
  }
 
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = ""
      res.on("data", (chunk) => (responseBody += chunk))
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("Mail sent:", responseBody)
          resolve(JSON.parse(responseBody))
        } else {
          console.log("MAIL SENDER ERROR:", res.statusCode, responseBody)
          reject(new Error(`Brevo API error: ${res.statusCode} ${responseBody}`))
        }
      })
    })
 
    req.on("error", (error) => {
      console.log("MAIL SENDER ERROR:", error)
      reject(error)
    })
 
    req.write(data)
    req.end()
  })
}
 
module.exports = mailSender
 