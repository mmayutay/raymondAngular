const fs = require('fs');
module.exports = (data, res) => {
    var template = fs.readFileSync("./template.html");
    template = template.toString();

    // DocxpressKey = docxpressSG.xYWkXNMZTfyQ4r96EdGVMg.PLtzVcgBEdocxpressB19xkZx9PiPis_ZnPaKAmOikVC38fx-nXo
    let apiKey = "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 ";
    template = template.replace("_NAME_", data.user)

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
