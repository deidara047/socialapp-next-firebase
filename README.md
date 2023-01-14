## Overview
This is an application about a Social Media App, made with Firebase, Redux and NextJS. You can: create an account with Email/Password system, create posts, like posts, comment posts, edit posts, delete posts, edit the description of your user, and delete your account (yep, you can't edit or delete comments). 

I am not a big fan of my login system, I would improve it if I have more time, anyways on next projects it will be improved. Did you see that sad face on the corner? That is the section where a user panel was going to be. You were going to have the opportunity to follow other users and... yes, but not to complicate the project further, I removed it, sorry.


You can check [this video](https://www.youtube.com/watch?v=hsFe38Lji_Y) to see full functionality.

## Things to take into account
- This project pretends to be in a Junior Developer portfolio. As you can see, it's the first project in this profile, and more exciting projects will come in the future
- This project is very simple, it probably has many security issues but its only purpose is to demonstrate my ability to develop a simple social network project
- The order of the files and its code is probably very confusing. I recognize my mistake and I'm going to take that into account in future projects
## Firebase Issue
This project will **probably not be possible to view online**, this is due to the fact that the free Firebase license has certain limitations. However, if you want to test this project:
1. In your PC, find a good location and open it in your CMD and type `git clone https://github.com/deidara047/socialapp-next-firebase.git`
2. Install the dependencies with `npm install`
3. You need your own Firestore and Authentication Firebase account. When you get it, go to `firebase.ts` file and replace all the variables:
    ```js
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_API_KEY, // <-- Replace with your Firebase Account data
          authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN, // <-- Replace with your Firebase Account data
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // <-- Replace with your Firebase Account data
          storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET, // <-- Replace with your Firebase Account data
          messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID, // <-- Replace with your Firebase Account data
          appId: process.env.NEXT_PUBLIC_APP_ID // <-- Replace with your Firebase Account data
        };
    ```
    (you can also create an .env.local file and use Enviroment Variables, and no need for anything else since NextJS supports Enviroment Variables. more info [here](https://nextjs.org/docs/basic-features/environment-variables))
4. Run `npm run dev` and open it in your browser at `http://localhost:3000`
