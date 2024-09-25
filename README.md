Business Requirements Document (BRD) 
Second-Hand Goods Selling Website
(Keller Store, https://kellerstore.vercel.app, www.kellerstore.com)


Table of Contents
1. Project Description and Objectives
2. Project Scope
3. Functional Requirements
4. Technical Requirements
5. Technologies to be Used
6. Performance Issues
7. Distribution Strategies
8. Project Timeline
9. Risk Management







Summary:
1. Project Description and Objectives
Keller Store aims to facilitate economical and environmentally friendly shopping by providing a platform for buying and selling second-hand products. The platform targets individuals interested in second-hand goods by offering a reliable and user-friendly shopping experience for both buyers and sellers.
2. Project Scope
The project encompasses the development of comprehensive features and entities, including User Accounts, Ad Categories, Ads (Sales Ads), Communication (Messaging), Buying and Selling Transactions, and more.
3. Functional Requirements
The functional requirements include features such as Product Listing and Filtering, User Profile and Security, Communication and Messaging, Follow and Add to Favorites, Category and Tags, Mobile Compatibility and Application Support, and Search and Filtering Optimization.
4. Technical Requirements
The technical requirements involve Database Implementation, Making the Website Mobile Compatible, Security Precautions including Authentication and Authorization, and Access Control, and User-Friendly User Interface and Effective User Experience.
5. Technologies to be Used
The project will use Frontend Development technologies like HTML, CSS, JavaScript, React, and TypeScript, Backend Development with Node.js, Express.js, Database systems such as PostgreSQL, MongoDB, Firebase, Web Server and Security technologies including Firebase, JWT, and HTTPS, as well as Mobile App Support using React Native.
6. Performance Issues
The project addresses Performance Issues such as Concurrent User Optimization through Database Indexing and Caching Mechanisms, as well as Scalability using Server-Side Scaling.
7. Distribution Strategies
The distribution strategies involve Cloud Deployment and Client Accessibility, ensuring server deployment on cloud platforms and web-based access compatibility with various browsers.
8. Project Timeline
The project's timeline includes a 3-month duration for Development and Testing, followed by a 1-month duration for Application Deployment and Support.
9. Risk Management
Risk Management strategies encompass identified risks such as Data Security Risks and User Acceptance Risks, with corresponding mitigation strategies for security measures and feedback management using agile development methodologies.






















1. Project Description and Objectives
1.1 Project Name: Keller Store
1.2 Project Purpose:
"Our aim is to enable economical and environmentally friendly shopping by bringing used products together with buyers."
1.3 Targeted Users:
"By offering an easy and reliable platform for second-hand goods shoppers, we aim to meet the needs of both sellers and buyers.
1.4 Emphasis on Sustainability:
"We aim to provide a sustainable shopping experience by evaluating idle products."
1.5 Reliability and Quality:
"We are here to create a second-hand shopping environment focused on users' safety and satisfaction."
1.6 Offering an Economic Alternative:
"We aim to be the first choice of those looking for budget-friendly and quality products."
1.7 Community Building Opportunities:
"By bringing second-hand shopping enthusiasts together, we want to create a community based on sharing and experiences."



2. Project Scope

2.1. User Accounts:
The User entity embodies the core of the platform, encapsulating the following attributes:
UserID: Unique identifier for each user within the system.
Username: The distinct name by which each is identified on the platform.
Password: Secure access key for user authentication and data protection.
Email: User's email address critical for communication and account management.
Contact Information: Essential details enabling user interaction and transaction facilitation.

The User entity establishes pivotal relationships within the platform, empowering users with the ability to manage their listings and engage in meaningful interactions with other users. These relationships form the foundation for a dynamic and user-centric environment.

User admin capabilities are integrated to streamline administrative tasks. Notably, features such as 'Like' and 'Favorite' functionalities are incorporated to enhance the user experience and interaction with the platform's offerings.
2.2. Ad Categories:
The Category entity serves as a fundamental organizational structure for the platform's listings, encompassing the following attributes:
CategoryID: Unique identifier for each category within the system.
CategoryName: Descriptive name for each category, facilitating intuitive grouping of listings.
ParentCategoryID: Identifier for parent categories, facilitating hierarchical organization of subcategories.
2.3. Ads (Sales Ads):
Ad entity represents the pivotal component of the platform, encapsulating the following attributes:
AdID: Unique identifier for each listing, crucial for individual listing identification.
Title: Concise and descriptive title for each listing, capturing the essence of the item or service being offered.
Description: Detailed account of Ad, providing comprehensive information to potential buyers.
Price: The monetary value associated with the listed item or service.
Posting Date: and time of listing, essential for chronological arrangement and awareness of listing longevity.
UserID: Identifier linking Ad to its respective user, establishing ownership and accountability.
CategoryID: Identifier connecting Ad to its designated category, ensuring systematic categorization. 8 Status: Indication of Ad's current state, whether active, inactive, or pending.

Ad Details entity serves as a repository for enhanced details associated with listings, including attributes such as:
Condition: Specification of the item's condition, distinguishing between new and used items.
Type: Categorization of Ad as personal or commercial, providing crucial context for potential buyers.
Specific Attributes: Tailored attributes relevant to the diverse range of product categories, ensuring comprehensive and informative listings.

The Images entity manages the visual representation of listings, embracing the following attributes:
ImageID: Unique identifier for each image associated with a listing.
ListingID: Link to the respective listing, establishing the image-listing relationship.
ImageURL: The web address of the image, enabling seamless visual integration within the platform.
Description: An optional descriptive text associated with the image, enriching the visual context for potential buyers.
2.4. Communication (Messaging):
The Message entity serves as a pivotal communication conduit between users, containing attributes such as1. MessageID: Unique identifier for each message exchanged within the system. 2. Content: The textual content of the message, facilitating clear and comprehensive communication. 3. SenderID: Identifier of the message sender, crucial for message attribution and interaction tracking. 4. ReceiverID: Identifier of the message recipient ensuring accurate and targeted delivery. 5. Timestamp: Date and time of message transmission, enabling chronological message organization and retrieval.
2.5. Buying and Selling Transactions:
The Transaction entity plays a pivotal role in managing transactional details within the platform, encompassing the following attributes:
TransactionID: Unique identifier assigned to each transaction, facilitating transaction tracking and reference.
ListingID: Identifier linking the transaction to the respective listing, establishing the transaction-item relationship.
BuyerID: Unique identifier for the buyer involved in the transaction, ensuring buyer identification. 
SellerID: Unique identifier for the seller engaging in the transaction, facilitating seller recognition.
Transaction: Date and time when the transaction occurred, enabling chronological transaction history.
Status: Indication of the transaction status, whether pending, completed, or canceled, offering clarity on transaction progress.
2.6. Favorite System:
The Favorites entity provides users with the ability to mark listings as favorites for convenient access and, incorporating attributes such as:
UserID: Unique identifier of marking Ad as a favorite, ensuring individual user favorite tracking. 2 ListingID: The identifier of Ad marked as a favorite by the user, facilitating listingiting and retrieval.
2.7. Dashboard:
The Dashboard entity serves as a centralized hub for users to manage their listings and account settings efficiently. It includes attributes such as:
DashboardID: Unique identifier for each user dashboard, enabling individual dashboard management.
UserID: Identifier linking the dashboard to the respective user, ensuring personalized dashboard access.
Settings: Configuration options allowing users to personalize their dashboard experience and account settings.
2.8. Notification System:
The notification entity enables the platform to communicate essential updates and information to users effectively, encompassing attributes such as:
NotificationID: Unique identifier for each notification within the system, facilitating notification tracking.
UserID: Identifier of the user receiving the notification, ensuring targeted notification delivery.
Notification Type: Categorization of the notification type (e.g., new listing alert, system update) for clear communication.
Message: Content of the notification providing relevant information to users, enhancing user engagement and awareness.

2.9. Mobile Compatibility:
The system has a responsive design and mobile application support that can be easily used on mobile devices.


3. Functional Requirements
3.1 Product Listing and Filtering:
Users can easily list their products and organize search results by category, price range, condition, etc. An interface that allows them to filter by criteria.
3.2 User Profile and Security:
Account management and security features that will allow users to create accounts, manage profile information and shop securely.
3.3 Communication and Messaging:
A messaging system for buyers to communicate with sellers. This system facilitates communication for sales details, delivery information and other matters.
3.4 Follow and Add to Favorites:
A watch list feature where users can follow sellers or products they are interested in and add them to favorites.
3.5 Category and Tags:
An organizational system that helps users find what they are looking for more easily by assigning products to the correct categories and tags.
3.6 Mobile Compatibility and Application Support:
A mobile compatible website and/or mobile application support that users can easily access via mobile devices.
3.7 Search and Filtering Optimization:
Search engine optimization (SEO) and advanced filtering options so users can get fast and accurate results when searching.
4. Technical Requirements
4.1 Database Requirements:
A database to store user account information and product data.
4.2 Making the Website Mobile Compatible:
A mobile compatible website that will work smoothly on different devices.
4.3 Security precautions:
SSL certificate and other security measures to protect user data.
Two main headings are important for security measures: Authentication and Authorization and Access Control
4.3.1 Authentication and Authorization:
Secure Login: SSL/TLS for secure data transmission. Token authentication for all users.
Data Security: Passwords hashed using industry-standard algorithms.Encrypted storage of sensitive user data.
4.3.2 Access Control:
Role-Based Access:Admin and users have specific roles and permissions. Restricted access to certain functionalities based on roles.

4.4 User-Friendly User Interface and Effective User Experience:
The design will provide a user-friendly user interface and effective user experience.

5. Technologies to be Used
5.1 Frontend Development: 
HTML, CSS, JavaScript: Fundamental web development languages. 
React and TypeScript: Modern frontend frameworks. 
5.2 Backend Development: Node.js and Express.js: 
Popular web frameworks for backend development. 
5.3 Database: PostgreSQL, MongoDB, Firebase: 
Common database systems used for storing and managing data. 
5.4 Web Server and Security: 
Firebase, JWT (JSON Web Token), HTTPS, OAuth. 
5.5 APIs and Services: RESTful API, Firebase:
Quick and user-friendly services for tasks like user authentication and file storage. 5.6 Mobile App Support: React Native: 
React Native: Developing a mobile application for your second-hand sales platform.

6. Performance Issues
6.1 Concurrent User Optimization:
Database Indexing: Efficient indexing for quick data retrieval.
Caching Mechanisms: Implement caching for frequently accessed data.
6.2 Scalability:
Server-Side Scaling: Use of scalable server architecture for future growth.
7. Distribution Strategies
7.1 Cloud Deployment:
Server Deployment: Utilize cloud platforms like Docker for scalability. Load balancing for optimized performance.
7.2Client Accessibility:
Web-Based Access: Ensure compatibility with various browsers for a wider user base.
8. Project Timeline
Duration: 3 Months. Development and Testing 
Duration: 1 Month. Application Deployment and Support. 
9. Risk Management
9.1 Identified Risks:
Data Security Risks: Regular security audits and updates.
User Acceptance Risks: Regular feedback sessions during development.
9.2 Mitigation Strategies:
Security Measures: Regular updates and patches for security vulnerabilities.
Feedback Management: Agile development methodologies for quick adaptation.
