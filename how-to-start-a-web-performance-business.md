# How to Become a Website Speed Superhero

This guide will teach you, step-by-step, how to get into the business of making websites faster. We'll be so specific that even a 12-year-old with determination can follow it and succeed.

## The Big Idea (Your Superpower)

Most business websites are surprisingly slow, especially on phones. Slow websites lose money because people click away. Fast websites make more money because they rank higher on Google and customers stay.

**Your Superpower:** You will learn how to make websites super-fast. You will get paid for this skill because you will be helping businesses make more money.

---

## Level 1: Get Your Utility Belt (Your Tools)

You only need a few free tools for this job.

1.  **A Computer with Internet:** Your base of operations.
2.  **A Code Editor (Visual Studio Code):** This is like a magical notepad that understands code. It's free. Download it from `https://code.visualstudio.com/`.
3.  **A GitHub Account:** This is like a free online backpack to store your code and publish your websites. Sign up at `https://github.com/`.
4.  **Google PageSpeed Insights:** This is your "Website Speed Scanner." You give it a website address, and it tells you how fast it is. It's your most important tool for finding clients.

---

## Level 2: Learn the Moves (Your Skills)

You don't need to be a master coder, but you need to know the basics.

### Skill 1: Learn Basic HTML and CSS

*   **What they are:** HTML provides the **bones** of a website (the text, the images). CSS provides the **style** (the colors, the layout, the fonts).
*   **How to learn:** Spend a few days on `https.www.freecodecamp.org`. Complete the first sections on "Responsive Web Design." You only need to learn enough to understand how a page is put together, not enough to design one from scratch.

### Skill 2: Learn How to "Clone" a Website

This is your core technical skill. You will be taking a slow website and moving it to a fast home.

1.  **Find the Code:** Go to any website. Right-click and choose "View Page Source." This is the site's HTML.
2.  **Copy the HTML:** Select all the text (`Ctrl+A` or `Cmd+A`) and copy it (`Ctrl+C` or `Cmd+C`).
3.  **Create Your File:** In VS Code, create a new file named `index.html`. Paste the code into it.
4.  **Find the CSS:** In the HTML you just pasted, look for a line in the `<head>` section that ends in `.css`. It will look something like `<link rel="stylesheet" href="https://some-website.com/style.css">`. Copy that URL, paste it into your browser's address bar, and you will see the CSS code.
5.  **Copy the CSS:** Select all and copy it. In VS Code, create a new file named `style.css` and paste the code.
6.  **Fix the Link:** In your `index.html` file, find that `<link>` tag again and change the `href` to just `style.css`.
7.  **Save the Images:** On the original website, right-click each image and "Save Image As...". Save them into a folder named `images` next to your HTML file. In your `index.html`, find the image tags (`<img>`) and change their `src` to point to your saved images (e.g., `src="images/logo.png"`).

This process seems complicated at first, but after doing it three times, it will feel like a simple routine.

### Skill 3: Publish Your Site with GitHub Pages

1.  On your GitHub account, create a new repository. Give it a simple name.
2.  In VS Code, use the built-in source control tab to "publish" your project to the new GitHub repository.
3.  On the GitHub repository page, go to `Settings` > `Pages`.
4.  Under "Branch," select `main` and click `Save`.
5.  After a minute, your website will be live at an address like `your-username.github.io/repository-name`.

**Congratulations! You are now a web publisher.**

---

## Level 3: Build Your Lair (Your Credibility)

No one will hire you if you can't prove you're good.

### Step 1: Your Own Website is Your #1 Ad
*   Your first project is your own business website. It can be a simple, one-page site.
*   It must introduce you and what you do.
*   **Crucially, it must score 95-100 on Google PageSpeed Insights.** This is your resume.

### Step 2: Build Your Portfolio of Proof
*   You need to show your work. Create a "Case Studies" page on your website.
*   Find 3 slow websites of local businesses.
*   For each business:
    1.  Clone their site using the steps above.
    2.  Publish the fast version on your GitHub Pages.
    3.  On your "Case Studies" page, show a "Before" screenshot of their bad PageSpeed score, and an "After" screenshot of the 100/100 score from the version you made, with a link to your live demo.

You now have undeniable proof that you can do the work.

---

## Level 4: Find Your Missions (The Business)

### The Hunt:
1.  Pick a local business type (e.g., "plumbers in dallas").
2.  Search Google and go to pages 2, 3, 4 to find businesses that need help.
3.  Run their websites through Google PageSpeed Insights. Any site in the red or orange is a potential client.

### The Outreach (with a parent's supervision):
*   Find their contact email and send a simple message.

> **Subject:** A question about your website speed
>
> **Message:** Hi [Business Name],
>
> My name is [Your Name] and I'm a student web performance specialist. I noticed your website loads a bit slowly on mobile phones, which Google says can affect your search ranking.
>
> I actually built a faster version to show you the difference. You can see it here: `[Link to your demo on GitHub]`
>
> If you're interested, I can help you make your main website just as fast.
>
> Thanks,
> [Your Name]

---

## Level 5: The Reward (Getting Paid)

This part requires a parent's help.

1.  **The Deal:** You show them the working demo. If they love it and want to use it for their real site, they pay you. A good starting price for your first few jobs is $200-$500.
2.  **Getting Paid:** You will need a parent to help you set up and manage a PayPal or Stripe account to accept the payment.
3.  **The Hand-Off:**
    *   Once paid, you need to help the client point their domain to your fast site.
    *   This is the only tricky part. You or a parent will need to get on a call with the client.
    *   The client logs into their domain provider (like GoDaddy).
    *   You give them four IP addresses that you get from GitHub's help pages. They put those four addresses into their DNS "A Records".
    *   Within a few hours, their domain will point to the new, fast website.

You did it. You used your technical skill to solve a real-world business problem and got paid for the value you created.