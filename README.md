<br/>
<p align="center">
  <a href="https://github.com/lifeOfKamil/Fetch-Dog-Search">
    <img src="/src/assets/pupmatch_logo.jpg" alt="Logo" width="150" height="150">
  </a>

  <h2 align="center">PupMatch: Dog Adoption App</h2>

  <p align="center">
   A dog adoption platform built using React and TypeScript, where users can browse and filter their favorite dogs, then get matched with the perfect pup!
    <br/>
    <br/>
    <a href="https://github.com/lifeOfKamil/Fetch-Dog-Search"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/lifeOfKamil/Fetch-Dog-Search">View Demo</a>
    .
    <a href="https://github.com/lifeOfKamil/Fetch-Dog-Search/issues">Report Bug</a>
    .
    <a href="https://github.com/lifeOfKamil/Fetch-Dog-Search/issues">Request Feature</a>
  </p>
</p>

## Table Of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About The Project

<img src="/src/assets/github_mockup_01.jpg" alt="pupmatch_readme_mockup_laptop" width="1000">

PupMatch is a frontend application built for the Fetch take-home assignment. Users can log in, browse dogs, filter by breed and location, and favorite dogs. 

Once satisfied, they can generate a match using the /dogs/match endpoint. Every API interaction respects Fetch's authentication model via HTTP-only cookies. 

## Built With

- [Vite](https://vitejs.dev/) - Google's UI toolkit for building natively compiled applications.
- [React](https://react.dev/) - Programming language optimized for building mobile, desktop, server, and web applications.
- [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript for safer and more predictable code.
- [Axios](https://axios-http.com/) - Handles HTTP requests with simple syntax and built-in support for sending cookies.
- [React Router](https://reactrouter.com/) - Manages in-app navigation with clean URL routing for multiple pages.

## Features

- Login via ```/auth/login```, secured with HTTP-only auth cookies
- Browse Dogs with filter by:
  - Breeds
  - Location (city, state, zipcode)
  - Age
- Pagination and sorting
- Favorite dogs page
- Match with one dog based on favorites via ```/dogs/match```
- Autocomplete city search with fuzzy matching

## Getting Started

To get a local copy up and running, follow these simple example steps.

### Prerequisites

Ensure you have the following installed:

- npm (v6 or higher) or yarn (v1.22 or higher)

### Installation

1. Clone the Repository

```sh
    git clone https://github.com/lifeOfKamil/Fetch-Dog-Search.git
```

2. Navigate to the Project Directory

```sh
    cd your-repo
```

3. Install Dependencies

```sh
    npm install
```

4. Start Development Server

Navigate to the client-side project directory

```sh
	npm run dev
```

6. Open the App in Your Browser

Navigate to `http://localhost:5173` in your web browser to start using the app.

Feel free to reach out if you encounter any issues or have questions.

## Usage

Here are some additional screenshots and mockups:

- The app starts at ```/login``` and sets the auth cookie using Fetch's API
- After logging in, users are redirected to ```/search```
- Dogs can be filtered, paginated, favorited, and matched

<img src="/src/assets/github_mockup_02.jpg" alt="haan_readme_mockup_mobile" width="1000">

## Notes for Reviewers

- The app is deployed here: [live URL]
- All API calls include ```withCredentials: true``` to respect the auth cookie
- Match is regenerated every time on ```/match```
- Footer was omitted as it seemed redundant
- Mobile-first design, responsive across all screens
- Logo was generated using [Adobe Firefly](https://www.adobe.com/products/firefly/landpa.html?sdid=TKZTL5V8&mv=search&mv2=paidsearch&ef_id=Cj0KCQjwu7TCBhCYARIsAM_S3NgHuGib2ARiX4sk0TikxZYv4b12UJwMiaNU_EMjhz-JOro1gimgyKYaAnamEALw_wcB:G:s&s_kwcid=AL!3085!3!732678026591!e!!g!!adobe%20firefly!19870733758!148140507838&gad_source=1&gad_campaignid=19870733758&gbraid=0AAAAAD5r4Aw1L4NihorcrsHS9VYmmUjL7&gclid=Cj0KCQjwu7TCBhCYARIsAM_S3NgHuGib2ARiX4sk0TikxZYv4b12UJwMiaNU_EMjhz-JOro1gimgyKYaAnamEALw_wcB)

## Roadmap

See the [open issues](https://github.com/lifeOfKamil/Fetch-Dog-Search/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/lifeOfKamil/Fetch-Dog-Search/issues) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Please make sure you check your spelling and grammar.
- Create an individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/lifeOfKamil/Fetch-Dog-Search/blob/main/LICENSE) for more information.

## Authors

- **Kamil Lepkowski** - _Computer Science Graduate_ - [Kamil Lepkowski](https://github.com/lifeOfKamil) - _Designed and built PupMatch_

## Acknowledgements

I would like to express my gratitude to the following:

- **Vite:**
  For providing lightning-fast development with instant hot module replacement.

- **React:**
  For providing a powerful and flexible framework to build modern user interfaces.

  - **TypeScript:**
  For enabling type safety and improving development reliability.

- **Axios:**
  For simplifying API interactions and supporting authenticated requests with ease.

  - **React Router:**
  For seamless client-side routing and page transitions.

- **Fetch Take-Home API:**
  For providing the backend services and endpoint documentation for the assignment.

If you made it this far, thank you again for checking out my app!
