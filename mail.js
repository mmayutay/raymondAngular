const fs = require('fs');
module.exports = (data, res) => {
    var template = fs.readFileSync("./template.html");
    template = template.toString();

    let apiKey = "";
    template = template.replace("_NAME_", data.user)
    template = template.replace("_GMAIL_", data.request)
    const sendMail = (to, content) => {
      console.log(to);
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(apiKey);
      const msg = {
        to: to,
        from: 'raredatingorganization@gmail.com',
        subject: 'Rare Dating Code!',
        text: 'test',
        html: content
      };
      if (sgMail.send(msg)) {
        console.log("succes");
        
      } else {
        
        console.log('error')
      };
    };
    sendMail(data.email, template);
  }
