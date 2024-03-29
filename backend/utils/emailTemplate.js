module.exports.welcomeMessage = (name, link, email, password) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>
          
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Welcome onboard.
            We would like to confirm that your account was created successfully. 
           Click on the link and use the credentials below to access your account.
            </p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">Login</a>
           <ul>
           <li style="font-weight:bold;font-size:16px;margin-bottom:5px">Email: ${email}</li>
           <li style="font-weight:bold;font-size:16px">Password: ${password}</li>
           </ul>
           <p style="line-height:1.7;margin-bottom:1rem;">
           You can change your password after you login.
            </p>
            <p style="line-height:1.7;color:#AFAFAF;margin-bottom:1rem;">
            If you experience any issues logging into your account, reach out to us at admin@vm.sovereignhousegh.com.
            </p>
          </div>
        </body>
      </html>`;
};
module.exports.requestInterview = (name, date, interviewer) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>
          
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Thank you for your interest in Volunteering with Sovereign House GH.</p>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Can you let me know if you are available on the day and time listed below for an online interview? 
            </p>
            
           
           <p style="font-weight:bold;font-size:16px;margin-bottom:15px">Date and time: ${date}</p>
           
           <p style="line-height:1.7;margin-bottom:1rem;">
           Regards,
            </p>
           <p style="line-height:1.7;margin-bottom:1rem;">
           ${interviewer}
            </p>
          </div>
        </body>
      </html>`;
};

module.exports.resetPassword = (name, link, email, password) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>
          
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Your password has been reset. 
           Click on the link and use the credentials below to access your account.
            </p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">Login</a>
           <ul>
           <li style="font-weight:bold;font-size:16px;margin-bottom:5px">Email: ${email}</li>
           <li style="font-weight:bold;font-size:16px">Password: ${password}</li>
           </ul>
           <p style="line-height:1.7;margin-bottom:1rem;">
           You can change your password after you login.
            </p>
            <p style="line-height:1.7;color:#AFAFAF;margin-bottom:1rem;">
            If you experience any issues logging into your account, reach out to us at admin@sovereignhousegh.com.
            </p>
          </div>
        </body>
      </html>`;
};
module.exports.applicationMessage = (name) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Thanks for your application.
            We would like to confirm that your application has been received. 
           We will review your application and get back to you as soon as we can.
            </p>
          </div>
        </body>
      </html>`;
};
module.exports.studentApplicationMessageUpdate = (name, content) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            ${content}
            </p>
          </div>
        </body>
      </html>`;
};
module.exports.interviewMessage = (name, link) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            Once again, thank you for your interest in volunteering for Sovereingn House GH. The meeting link can be found below.
            </p>
            <p style="font-weight:bold;font-size:16px">Meeting link: ${link}</p>
            <p style="line-height:1.7;margin-bottom:1rem;">Or click on the button below</p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">View</a>
           
          </div>
        </body>
      </html>`;
};
module.exports.notificationMessage = (name, content, link) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            ${content}
            </p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">View</a>
           
          </div>
        </body>
      </html>`;
};
module.exports.studentApplicationMessage = (
  name,
  firstname,
  lastname,
  email,
  phone,
  link
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Sovereignhousegh</title>
        </head>
        <body style="margin:0;padding:2rem;background-color:#fafafa;">
          <div class="container" style="background-color:white;border:1px solid transparent;border-radius:10px;border-top:18px solid #016838;padding:1rem;">
            <h1 style="text-align:center;color:#016838;text-transform:uppercase;letter-spacing:1.5;">Sovereign House GH</h1>
            <h3 style="text-transform:capitalize;color:#016838;margin-bottom:1.5rem;">Hello ${name},</h3>
            <p style="line-height:1.7;margin-bottom:1rem;">
            A new student application has been received. Details can be found below.
            </p>

            <ul style="line-height:1.7;margin-bottom:2rem;">
           <li style="font-weight:bold;font-size:16px;margin-bottom:5px">First Name: ${firstname}</li>
           <li style="font-weight:bold;font-size:16px;margin-bottom:5px">Last Name: ${lastname}</li>
           <li style="font-weight:bold;font-size:16px;margin-bottom:5px">Email: ${email}</li>
           <li style="font-weight:bold;font-size:16px">Phone: ${phone}</li>
           </ul>
           <p style="line-height:1.7;margin-bottom:1rem;">
           Click on the link below to view full details.
           </p>
            <a href=${link} style="display:inline-block;background-color:#016838;color:white;padding:16px 30px;border:none;border-radius:5px;text-decoration:none;margin-bottom:5px">View</a>
           
          </div>
        </body>
      </html>`;
};
