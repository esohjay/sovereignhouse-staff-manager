module.exports.welcomeMessage = (name, link, email, password) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>2dsAcademy</title>
          
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Welcome onboard.
            We would like to confirm that your account was created successfully. 
           Click on the link and use the credentials below to access your account.
            </p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">My Dashboard</a>
           <ul>
           <li style="font-weight:bold;font-size:18px">Email: ${email}</li>
           <li style="font-weight:bold;font-size:18px">Password: ${password}</li>
           </ul>
            <p style="line-height:1.7;color:#AFAFAF;margin-bottom:1rem;">
            If you experience any issues logging into your account, reach out to us at admin@vm.sovereignhousegh.com.
            </p>
          </div>
        </body>
      </html>`;
};
