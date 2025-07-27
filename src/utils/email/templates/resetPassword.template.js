const resetPasswordTemplate = ({ OTP } = {}) => {
  return `<!DOCTYPE html>
                <html>
                <head>
                    <style type="text/css">
                    body{background-color: #F0F8FF;margin: 0px;}
                    </style>
                </head>
                <body style="margin:0px;"> 
                <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #6495ED;">
                <tr>
                <td>
                <table border="0" width="100%">
                <tr>
                <td>
                <h1>
                </h1>
                </td>
                <td>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
                <tr>
                <td style="background-color:#4169E1;height:100px;font-size:50px;color:#fff;">
                </td>
                </tr>
                <tr>
                <td>
                <h1 style="padding-top:25px; color:#4169E1">Password Reset OTP</h1>
                </td>
                </tr>
                <tr>
                <td>
                <p style="padding:0px 100px;">
                You have requested a password reset. Please use the following One-Time Password (OTP) to proceed with resetting your password. This OTP is valid for a limited time.
                </p>
                </td>
                </tr>
                <tr>
                <td>
                <h2 style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#4169E1; ">${OTP}</h2>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </body>
                </html>`;
};

export default resetPasswordTemplate;
