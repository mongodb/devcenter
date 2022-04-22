import { ContentPiece } from '../interfaces/content-piece';

interface L1Content {
    content: ContentPiece[];
    featured: ContentPiece[];
}
const getL1Content = (slug: string = 'all'): L1Content => {
    const featured: ContentPiece[] = [
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 101 article',
            description:
                'Last summer, I was bugging my boss [Joe Drumgoole](https://twitter.com/jdrumgoole) for a promotion. I asked him what I needed to do in order to get promoted. He explained that I was doing great work, but I needed to raise my profile internally at the company. He said that my MongoDB colleagues needed to know my name and my work.\n\nThis advice felt exceptionally challenging as we were in the middle of the pandemic, and I had no hope of seeing my colleagues in person and striking up an impromptu conversation. I realized I was going to have to work strategically to raise my profile.\n\nI sought the advice of [Ken Alger](https://www.linkedin.com/in/kenwalger/) who provided me with several suggestions on how to raise my profile. I disliked his advice as it was going to push me out of my comfort zone, but I decided to try it anyway.\n\nKen\'s advice worked. I raised my profile and was rewarded with a promotion.\n\n![A comic book style animation of a conversation between Lauren, Joe, and Ken about getting a promotion](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Raise_Your_Profile_e40bad22ef.gif "An overly dramatic recreation of conversations I\'ve had with Joe and Ken")\n\nThis concept of raising my profile has been a common thread throughout my career. When I was a full-time software engineer, my managers talked with me about expanding my scope and demonstrating influence.\n\nPerhaps you\'ve received similar feedback—you need to raise your profile, expand your scope, or demonstrate influence. Or perhaps you\'re doing amazing work and you\'ve been trying to figure out what you need to do in order to get your next promotion.\n\nIn this article, I\'ll answer the following questions:\n\n* [What is your profile?](#what-is-profile)\n* [What does it mean to raise your profile?](#what-raise-profile)\n* [Why should you bother raising your profile?](#why-raise-profile)\n* [What steps can you take to raise your profile?](#steps-raise-profile)\n* [How can you make a plan to raise your profile?](#plan-raise-profile)\n\n> [Luce Carter](https://twitter.com/LuceCarter1) and I recently hosted a live stream on this topic. Check out the recording below: :youtube[]{vid=Z3tgvOZdinM}\n\n## <a name="what-is-profile"></a>What is your profile?\n\nBefore we dig into the "why" and "how," let\'s get on the same page about what your profile is. Your profile describes who you are, what you can do, and what you are known for. Let\'s discuss each piece.\n\n### Who you are\n\nThe first thing people need to know is who you are professionally: things like your name, your role or title, and your company. Internally at your company, people also need to know your location within the company: things like your team, department, organization, and/or manager.\n\nAs an example, here are some facts about who I am:\n\n* Name: Lauren Schaefer\n* Title: Staff Developer Advocate at MongoDB\n* Location in my company: DevRel Team under [Rita Rodrigues](https://twitter.com/RitaMRDevIT)\n\n### What you can do\n\nThe next part of your profile is what you can do. Consider both your technical skills as well as your soft skills.\n\nHere are some things I can do:\n\n* Build web apps in JavaScript and Node.js\n* Discuss MongoDB data modeling best practices\n* Build CI/CD pipelines\n* Keynote conferences\n* Provide team glue through activities like the MongoDB DevRel Book Club\n\n### What you are known for\n\nThe final piece of your profile is what you are known for both internally at your company and externally in the wider developer community. Include technical skills and soft skills (duplicating items from the previous section is totally fine), values, traits, and other things you do.\n\nBelow are some things I\'m known for:\n\n* Creating engaging and easy-to-understand content\n* Completing tasks and projects on time with excellence and minimal supervision\n* Being detail- and action-oriented\n* Advocating for remote work\n* Creating silly [TikToks](https://www.tiktok.com/@lauren_schaefer) about life as a developer\n\n## <a name="what-raise-profile"></a>What does it mean to raise your profile?\n\nNow that we\'re on the same page about what a profile is, let\'s talk about how to "raise" it. Raising your profile means increasing the number of people who know your profile.\n\n<div align="center">\n<figure>\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/raisetheroof_cd5ef2f997.gif" alt="Michael and Dwight raise the roof"/>\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Raising your profile is not the same as raising the roof</figcaption>\n</figure>\n</div>\n\nYou\'ll likely want to work to raise your profile internally at your company and externally in the broader developer community.\n\nWhen considering how to raise your profile internally, think about working your way from your immediate team all the way up to your executive team:\n\n* Team\n* Management\n* Department\n* Company\n* Executive team\n\nWhen considering how to raise your profile externally, you have a variety of options:\n\n* Former colleagues or classmates\n* Local developers\n* Global developer community (in person or online)\n\n## <a name="why-raise-profile"></a>Why should you bother raising your profile?\n\nRaising your profile might seem like a lot of work. If you\'re like me, you\'d probably rather put your head down and get stuff done instead of putting in the effort to let people know about you.\n\nSo why should you bother raising your profile? Let\'s discuss four major reasons.\n\n### Meet *explicit* promotion requirements\n\nRaising your profile is a fairly common theme to see in the promotion requirements for software engineers and developers. Some companies focus more on internal influence while others focus more on external influence. Either way, companies want to see that you have a growing reputation.\n\nLet\'s take a look at some engineering career frameworks, using examples I’ve borrowed from other companies:\n\n* [Patreon\'s Engineering Levels](https://levels.patreon.com/) outlines their expectations for IC1 (Individual Contributor 1) all the way up to IC6 (Individual Contributor 6). The document has several categories including influence. As they move higher up the individual contributor ladder, engineers are expected to broaden their influence throughout the company and eventually to the entire industry.\n* [The Medium Engineering Growth Rubric](https://docs.google.com/spreadsheets/d/1EO-Dbsayn8Nz9Ii3MKcwRbt-EIJ2MjQdpoyhh0tBdZk/edit#gid=1098466721) defines engineers\' growth progression throughout many categories. One of the categories they include is Evangelism. Their engineers progress from influencing "individuals" to "small events" to "large groups" to "the whole industry" to "a wider audience outside the industry."\n* [The Khan Academy Engineering Career Development](https://docs.google.com/document/d/1qr0d05X5-AsyDYqKRCfgGGcWSshTMd_vfTggfhDpbls/edit) document describes how their engineers grow in skills, scope, and experience throughout their careers. The document has a section specifically on "evangelism and public artifacts" with the goal of recruiting top engineers to the company. Khan Academy incentivizes their engineers to share their work with the broader community through activities like blogging, contributing to open source projects, giving tech talks, and participating in meetups and hackathons.\n\n### Meet *implicit* promotion requirements\n<figure style="clear: both;float: right;">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_christina_morillo_1181421_c885c6e66a.jpg" alt="Group of peple having a meeting at a conference table filled with laptops and notepads" style="float:right;width:400px;margin-bottom: 10px;" />\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Photo by Christina Morillo from Pexels</figcaption>\n</figure>\n\nRaising your profile is commonly part of the *implicit* promotion requirements.\n\nEvery company handles promotions differently, but, in most cases, your manager will not be able to give you a promotion on their own. At the lower levels, your manager\'s manager and possibly your manager\'s peers will need to approve your promotion.\n\nAs you get into the higher levels, leaders across your organization and your company will need to agree to your promotion. The management team and executives need to know who you are and the work that you do in order to approve the promotion.\n\n### Take advantage of new opportunities\n\nAs you raise your profile, doors will begin to open for you. Some doors you\'ll strive to open yourself and others will unexpectedly swing open.\n\nBelow are examples of opportunities that may arise as you raise your profile:\n\n* A leadership opportunity\n* A new role at your company\n* A new job at another company\n* An invitation to speak at a conference, a live stream, or a podcast\n* An invitation to write a guest article or author a book\n* New connections with other industry leaders\n\n### Recruit other top developers to work with you\n\n<figure style="clear: both;float: left; margin-left: 0px; margin-bottom: 0px;padding-bottom: 0px;">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_linda_ellershein_3127883_55a26ec2ee.jpg" alt="The words \'JOIN OUR TEAM\' spelled out with magnetic letters. Multi colored lollipops surround the words." style="float:left;width:200px;margin-bottom: 10px;" />\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Photo by Christina Morillo from Pexels</figcaption>\n</figure>\n\nDevelopers love to work with other amazing developers. As you and your teammates build your profiles, your company\'s reputation will begin to grow. Top developers will want to work with you.\n\nIf your company has referral bonuses, attracting top developers to work with you has a nice monetary perk. Either way, you\'ll get to work with other amazing developers.\n\n\n## <a name="steps-raise-profile" ></a> What steps can you take to raise your profile?\n\nNow that you know what it means to raise your profile and why you should put in the effort to do it, let\'s talk about how you can do it. In this section, I\'ll discuss 10 ways you can raise your profile.\n\n### 1\\. Become the go\\-to person\n\n![Picture of a woman coding with a Python book beside her](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_christina_morillo_1181359_1_bc08a20e58.jpg "Photo by Christina Morillo from Pexels")\n\nBecome the go-to person for a particular language (e.g., Python), a technology (e.g., Kubernetes) or a common challenge that customers face (e.g., how to model data in MongoDB). Be that go-to person for your team or your entire company.\n\nAs an example, Dropbox specifically calls out "Domain Expertise" in their [career framework](https://dropbox.Docker.io/dbx-career-framework/what_is_impact.html). As their engineers grow their careers, they are expected to be the authority on a platform, a field, or a product category. Dropbox desires for their engineers to grow in depth or breadth.\n\n### 2\\. Contribute to open\\-source or public projects\n\nContributing to open-source or public projects is a great way for other developers to see your work. Being a contributor or a maintainer in a popular open-source project can give you a lot of visibility.\n\nIf, like me, you don\'t enjoy coding in your off-hours, see if there is a way you can code in the open at work. Your company may also see the value in contributing to open-source projects or developing in the open.\n\nYou may also want to create a readme for your Docker profile page to let people know a little about you. [Joe Karlsson](https://my.link.gallery/joekarlsson) has a nice [60-second tutorial](https://www.tiktok.com/@joekarlsson/video/6943307561995193606) on how you can easily do this with just a markdown file.\n\n### 3\\. Be the news reporter for your team\n\nReporting the news for your team is an easy way to get your name out wider than your core development team. Below are some examples of how you can report the news.\n\n* **Report the news to a cross-functional team.** If someone on your team needs to be a representative as part of a larger cross-functional team, volunteer to be that person. You\'ll bring status updates, but you can also become known as the person who identifies or solves problems as the larger team works together. You can also become known as the expert on your part of the project.\n* **Report the news to the executives.** If someone needs to report status to the executives, volunteer. This is a great way to get to know the executive team as they\'ll see your face on a regular basis.\n* **Curate an internal or external newsletter.** If you\'re not a fan of extra meetings, you can volunteer to curate an internal or external newsletter that provides updates about your piece of the product or the product as a whole. As an example, [Adrienne Tacke](https://twitter.com/AdrienneTacke) posts a weekly newsletter on the [MongoDB Community](https://www.mongodb.com/community/forums/u/yo_adrienne/activity/topics) and [dev.to](https://dev.to/mongodb). The newsletter covers all the amazing things our Developer Advocacy team is doing.\n\nKeep in mind that, depending on your company culture, reporting the news can become seen as a task that has less value than other, more technical tasks. Be sure you tailor the role in a way that gives you a lot of visibility and provides value to others.\n\n### 4\\. Write blog posts or articles\n\n<figure style="clear: both;float: right;">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_pixabay_261662_2a2105e249.jpg" alt="Zoomed in picture of a person\'s hands on a laptop while they write on their blog" style="float:right;width:400px;margin-bottom: 10px;" />\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Photo by Pixabay from Pexels</figcaption>\n</figure>\n\nIf you want to be seen as an expert on something, write about it.\n\nOthers may know more about a topic than you do, but don\'t let that stop you. If you\'re writing about something, people will assume you know what you\'re talking about.\n\nYou can write about things you already know or things you are learning. Writing about topics you don\'t already know is a great way to reinforce your learning.\n\nA multitude of options exist for where you can write:\n\n* Your company may have an engineering blog.\n* You can create your own personal blog.\n* You can use an existing blogging platform like dev.to or Medium that allows you to write without spinning up your own blog.\n\n### 5\\. Give tech talks\n\nGive a tech talk. You can give your talk at a small Lunch and Learn at your company or a huge international conference or anywhere in between. You can even give tech talks online by live streaming on Twitch or YouTube.\n\nWhether you\'re a seasoned expert or brand new to coding, you have a story to tell. You can talk about your favorite technology, best practices, or how you really messed something up (people love failure stories).\n\nMany people have a fear of public speaking. It\'s normal. Don\'t let that fear stop you. Start in small venues where you feel comfortable and take baby steps to other venues.\n\nFor tips on how to get started speaking at conferences, check out [this article](https://bcrecworks.medium.com/an-interview-with-lauren-schaefer-speaker-and-developer-advocate-at-mongodb-2f41ed9aedb5) where I was interviewed about how I got started with public speaking.\n\nIf you\'re interested in speaking about MongoDB at a conference, check out the [MongoDB Community Speakers Program](https://www.mongodb.com/developer/community/speaker-program/). You can apply to work with a speaking coach and get funding to attend a conference.\n\n### 6\\. Post on social media\n\n<figure style="clear: both;float: left; margin-left: 0px;">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_tracy_le_blanc_607812_21e69e3608.jpg" alt="Zoomed in picture of a person\'s hand holding a phone that is displaying their social networking apps" style="float:left;width:400px;margin-bottom: 10px;" />\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Photo by Christina Morillo from Pexels</figcaption>\n</figure>\n\nMaybe you love it or maybe you hate it, but it\'s hard to deny that social media is a great way to raise your profile.\n\nYou can create bite-sized content on platforms like Twitter, LinkedIn, Instagram, and TikTok. Or you can create longer, more in depth content on Twitch, YouTube, or a podcast. Posting to all of those platforms might seem a bit daunting, but you can likely reuse or recycle the same content.\n\nYou may be surprised to learn that posting to social media not only helps you raise your profile externally, it can also help you raise your profile internally. Colleagues who you may not interact with regularly during work hours may see your posts on social media. This has certainly been the case for me as people across MongoDB have been amused with my TikToks that I\'ve posted on LinkedIn.\n\n### 7\\. Lead an employee networking group\n\nLeading an employee networking group is a great way to get connected with other people throughout your company and demonstrate leadership. Sometimes executives join these groups, providing you with an opportunity to get to know them in an informal setting.\n\nCompanies have different names for employee networking groups. I\'ve also heard them called affinity groups or business resource groups. These are groups at your company for a particular set of people with a common interest or demographic.\n\nI will add a caveat to this recommendation. Some companies really value the work people do in leading these networking groups. Other companies see these as nice-to-have groups that don\'t provide a lot of value to the business. Be sure you can frame your work in these groups in a way that matters to your management team.\n\n### 8\\. Attend\\, host\\, or speak at a meetup or hackathon\n\nMeetups and hackathons allow you to get connected with other people in your local community. You never know what opportunities will arise from these connections.\n\nHosting a meetup doesn\'t require any technical skills, but, if you execute the meetups consistently, people will see you as a leader in your local tech community. Attending and asking thoughtful questions will also aid in you being seen as a technical leader.\n\n### 9\\. Answer questions publicly online\n\nAnswering questions publicly online in forums provides value to others and increases your name recognition. Be sure your answers are kind, thoughtful, and accurate. As you begin to answer questions more regularly, your reputation will grow.\n\nIf you\'d like to give this a try, join the [MongoDB Community](http://community.mongodb.com/). You can share your tips, tricks, and best practices with others.\n\n![Screenshot of the front page of the MongoDB Community](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2021_10_01_at_12_18_58_PM_a092a9ab07.png "Join us in the MongoDB Community")\n\n### 10\\. Advertise your work\n\n<figure style="clear: both;float: right;">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/pexels_andrea_piacquadio_3761509_df6dee482b.jpg" alt="Picture of a woman happily shouting into a megaphone" style="float:right;width:400px;margin-bottom: 10px;" />\n<figcaption style="color: rgb(184, 196, 194); font-size: 12px; line-height: 18px;">Photo by Andrea Piacquadio from Pexels</figcaption>\n</figure>\n\nMy last tip for you and, possibly the most important, is to advertise your work. A variety of options for advertising your work exist. Tailor the way you do this to your company culture and your personal style.\n\nIf you have a daily scrum or a weekly status meeting, show up ready to talk about what you\'ve accomplished since the last meeting.\n\nWhen you meet someone new, be ready with your elevator pitch. Practice your pitch, so you\'ll be comfortable and confident when the time comes.\n\nCapture any compliments you receive and make sure your management team sees them. For example, if someone tweets that they found this article really helpful 😉, I\'ll retrieve the link to the tweet and forward it to my manager. If someone gives me a compliment verbally, I ask them to send me an email with the compliment so I can forward it to my manager.\n\nI also have a document where I keep a running list of every compliment I receive. When it\'s time for me to write my performance review, I organize the compliments and paste them directly into my review. This provides my management team with tangible evidence that I\'m doing my job well.\n\nIf possible, find a manager who is good at advertising your work as well. I\'ve been very fortunate that my director (my manager\'s manager) acts as a sponsor for me. He speaks well of me when I\'m not in the room. If I send him a really good compliment, he forwards it on to his manager. This means that the executive team isn\'t only hearing about me at performance review time—they\'re hearing positive things about me throughout the year.\n\n###\n## <a name="plan-raise-profile"></a>How can you make a plan to raise your profile?\n\nI hope this article has encouraged you to raise your profile and provided you with practical steps you can take. But I don\'t want it to stop there. I encourage you to make a plan.\n\nI\'ve created a [How to Raise Your Profile Worksheet](https://www.slideshare.net/LaurenHaywardSchaefe/how-to-raise-your-profile-worksheet) you can use to make a plan and stick to it.\n\n<div align="center">\n<a href="https://www.slideshare.net/LaurenHaywardSchaefe/how-to-raise-your-profile-worksheet">\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2021_10_01_at_10_25_34_AM_fbf3fb1356.png" alt="Screenshot of the first page of the How to Raise Your Profile Worksheet" height="470" />\n<img src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2021_10_01_at_10_25_49_AM_f1ec211446.png" alt="Screenshot of the second page of the How to Raise Your Profile Worksheet" height="470" />\n</a>\n</div> \n\nThe first page of the [worksheet](https://www.slideshare.net/LaurenHaywardSchaefe/how-to-raise-your-profile-worksheet) helps you identify what your profile is and how you want it to evolve. The second page of the worksheet asks you to select what actions you can take this week, this month, and this year to raise your profile. It also asks you to describe how you will evaluate if those actions are successful and how you will hold yourself accountable.\n\nI encourage you to print out the [worksheet](https://www.slideshare.net/LaurenHaywardSchaefe/how-to-raise-your-profile-worksheet) and spend some time making a plan that works for you. Talk about your plan with a friend or mentor. Regularly revisit your plan to track your progress and see what actions you can take next.\n\n## Summary\n\nRaising your profile internally at your company and externally in the broader developer community is an important part of growing your career as a developer. A variety of ways exist to let people know who you are and what you can do. [Make a plan to raise your profile](https://www.slideshare.net/LaurenHaywardSchaefe/how-to-raise-your-profile-worksheet) little by little over time.\n\nI can\'t wait to hear about you in the coming weeks and months!',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: ['Netlify', 'Docker'],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Article',
            },
            slug: 'product/atlas/a1',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Docker Actions and Netlify 1.',
            description:
                "In this post we'll see how to use Docker Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: ['Netlify', 'Docker'],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Video',
            },
            slug: 'product/atlas/v1',
        },

        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 102 tutorial',
            description: 'A description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: ['Netlify', 'Docker'],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Tutorial',
            },
            slug: 'product/atlas/t1',
        },
    ];
    const content: ContentPiece[] = [
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 1.',
            description: 'Some Description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: ['Netlify', 'Docker'],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Demo App',
            },
            slug: 'product/atlas/d1',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 2.',
            description: 'Some Description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: ['C'],
                authorType: 'MongoDB',
                contentType: 'Demo App',
            },
            slug: 'product/atlas/d2',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Create a Custom Data Enabled API in MongoDB Realm in 10 Minutes or Less 3.',
            description: 'Some description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: ['Python'],
                authorType: 'MongoDB',
                contentType: 'Demo App',
            },
            slug: 'product/atlas/d3',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Docker Actions and Netlify 1.',
            description:
                "In this post we'll see how to use Docker Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Video',
            },
            slug: 'product/atlas/v1',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Docker Actions and Netlify 2.',
            description:
                "In this post we'll see how to use Docker Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Video',
            },
            slug: 'product/atlas/v2',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'Continuously Building and Hosting our Swift DocC Documentation using Docker Actions and Netlify 3.',
            description:
                "In this post we'll see how to use Docker Actions to continuously generate the DocC documentation" +
                ' for our Swift libraries and how to publish this ' +
                'documentation so that can be accessed online, using Netlify.',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Video',
            },
            slug: 'product/atlas/v3',
        },
        {
            authors: ['Farah Appleseed'],
            title: 'This is 101 article',
            description: 'eiuhfwe',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: ['C++'],
                authorType: 'MongoDB',
                contentType: 'Article',
            },
            slug: 'product/atlas/a1',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 102 article',
            description: 'This is my second article',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Article',
            },
            slug: 'product/atlas/a2',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 103 article',
            description: 'This is my third article',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Article',
            },
            slug: 'product/atlas/a3',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is 104 article',
            description: 'This is my fourth article',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Article',
            },
            slug: 'product/atlas/a4',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 102 tutorial',
            description: 'Some description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Tutorial',
            },
            slug: 'product/atlas/t1',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 101 tutorial',
            description: '101 tutorial description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Tutorial',
            },
            slug: 'product/atlas/t2',
        },
        {
            authors: ['Farah Appleseed'],
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'This is a 103 tutorial',
            description: 'Some description',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'Community',
                contentType: 'Tutorial',
            },
            slug: 'product/atlas/t3',
        },
        {
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 23',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Podcast',
            },
            slug: 'product/atlas/p1',
        },
        {
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 96',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Podcast',
            },
            slug: 'product/atlas/p2',
        },
        {
            image: {
                alt: 'thumbnail',
                url: 'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ATF_720x720_17fd9d891f.png',
            },
            title: 'MongoDB Podcast: Episode 2',
            description: 'Some podcast details',
            contentDate: new Date().toDateString(),
            tags: {
                l1Product: 'Atlas',
                l2Product: [],
                technology: [],
                programmingLanguage: [],
                authorType: 'MongoDB',
                contentType: 'Podcast',
            },
            slug: 'product/atlas/p3',
        },
    ];
    const returnContent =
        slug === 'atlas'
            ? content
            : slug === 'data-lake'
            ? content.slice(0, 10)
            : slug === 'vs-code'
            ? content.slice(0, 5)
            : slug === 'all'
            ? content
            : [];
    return { content: returnContent, featured };
};

export default getL1Content;
