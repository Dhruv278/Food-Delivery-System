exports.welcomeMail=()=>{
        return`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Welcome to Pizza Palace!</title>
          <style>
            /* Style for the email body */
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f8f8f8;
              margin: 0;
              padding: 0;
            }
            
            /* Style for the header */
            .header {
              background-color: #7ac142;
              color: white;
              text-align: center;
              padding: 20px 0;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
              animation: fadeIn 1s ease-in-out;
            }
            
            /* Style for the content */
            .content {
              padding: 20px;
              text-align: center;
            }
            
            /* Style for the button */
            .btn {
              display: inline-block;
              padding: 12px 24px;
              background-color: #7ac142;
              color: white;
              text-decoration: none;
              border-radius: 25px;
              transition: background-color 0.3s ease-in-out;
            }
            
            /* Hover effect for the button */
            .btn:hover {
              background-color: #8ed04f;
            }
            
            /* Style for the footer */
            .footer {
              margin-top: 20px;
              color: #666;
              font-size: 14px;
            }
            
            /* Animation for the header */
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            /* Animation for floating pizza slices */
            @keyframes floatPizza {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
              100% {
                transform: translateY(0);
              }
            }
            
            /* Apply animation to floating pizza slices */
            .pizza {
              display: inline-block;
              font-size: 40px;
              animation: floatPizza 3s ease-in-out infinite;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to Pizza Palace!</h1>
          </div>
          
          <div class="content">
            <p>Hi there!</p>
            <p>We're excited to welcome you to Dmato, your favorite destination for delicious Food delivered right to your doorstep.</p>
            <p>Start exploring our mouth-watering menu and place your first order!</p>
            <a href="http://127.0.0.1:3000/v1/restaurant/get" class="btn">Explore Menu</a>
            <p>If you have any questions or need assistance, don't hesitate to contact our support team.</p>
            <p>Enjoy your pizza!</p>
            <p class="footer">Best regards,<br>Your Dmato Team</p>
          </div>
          
          <div class="pizza">&#127829;</div>
        </body>
        </html>
        
        `
}