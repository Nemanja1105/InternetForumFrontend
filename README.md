<h1>Description:</h1>
InternetForum is web application built using <b>Angular 17</b>, with a user interface powered by <b>Bootstrap</b> and <b>Angular Material</b>, designed to facilitate online discussions among registered users on various topics. The forum is organized into distinct categories or "rooms," including Science, Culture, Sports, and Music, allowing users to engage in discussions tailored to their interests.

This web application comprises three main sections, each accessible to users based on their assigned user group: Administrator, Moderator, and Forum User.

The Administrator section grants exclusive access to administrators, empowering them to manage user accounts effectively. Administrators can approve or deny access for registered users, assign user groups, and define specific permissions, such as the ability to add, edit, or delete comments within specific categories.

Moderators, who belong to the Administrator or Moderator user groups, are responsible for overseeing user comments within the forum. They have the authority to publish new comments, with or without adjustments, or to prohibit inappropriate content.

The Forum section is accessible to all user groups and serves as the primary platform for user interaction. Users can explore different categories and engage in discussions by posting comments. The forum displays the latest 20 comments for each category, providing users with an overview of ongoing discussions.

The registration process for new users involves approval by administrators, after which users receive a notification via email. Subsequently, users can log in to the system using two-factor authentication, ensuring enhanced security. Upon login, users receive a JWT token to track their session securely.

The system architecture, depicted in Figure 1, consists of several components to manage user requests, authentication, authorization, and security. The Access Controller handles user requests, while the Authentication Controller manages user authentication and authorization. Additionally, the JWT Controller issues and validates JWT tokens for session tracking.

The Web Application Firewall (WAF) ensures the security of user requests by filtering potentially malicious traffic and enforcing defined rules for user input. The Certificate Controller is responsible for managing digital certificates for system components, while the SIEM component monitors and logs security-sensitive activities.

Furthermore, the system supports OAuth2 authentication, allowing users to log in using external accounts such as Google or GitHub.
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/45ba4329-d565-46d8-b486-4ee1ffbe7bba)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/e89fb579-bdc6-4d24-ae7f-23d4ce541119)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/486e1404-2dc5-4c8b-9290-ece9e730ed4b)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/72a787cd-8893-41f3-829d-1da9e08de64a)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/6dea3f84-88d8-40b3-a7e5-fb56a60c6065)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/1beebca7-2744-44fa-aaef-6e4383c63454)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/0b9b7280-fd6a-46c5-b958-c7dec87fa556)
![image](https://github.com/Nemanja1105/SigurnostFrontend/assets/93669392/63c3d9c3-8c36-4fef-acf6-52ac8a96dc44)







