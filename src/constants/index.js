// index.js
export const servicesData = [
    {
        title: "Frontend Development",
        description:
            "My interest in frontend development started with curiosity about how websites are built with code. I enjoy creating things and solving problems through programming. I started with Vanilla JavaScript, HTML, and CSS, then moved on to frontend frameworks such as React and Vue.",
        items: [
            {
                title: "React",
                description: "(Redux, Zustand, Axios, TanStack Query, i18n)",
            },
            {
                title: "Vue",
                description: "(Vue 3, Composition API, Vue Router, GSAP)",
            },
            {
                title: "Nuxt",
                description: "(Nuxt, SSR, SSG, Vue)",
            },
        ],
    },
    {
        title: "Backend Experience",
        description:
            "As I learned more about frontend development, I became interested in how the backend works behind the scenes. I started learning Node.js to understand how frontend and backend communicate. Later, I joined a government-funded coding bootcamp where I learned Java and more about backend development.",
        items: [
            {
                title: "Node.js",
                description: "(Express, REST API, Axios, NoSQL)",
            },
            {
                title: "Java",
                description: "(Spring Boot, Spring MVC, MySQL)",
            },
        ],
    },
    {
        title: "3D Development Experience",
        description:
            "As I became more interested in interactive web experiences, I started learning about 3D development. I learned Three.js through Bruno Simon's course (shout out to Bruno Simon what a great tutor) and explored the basics of creating and working with 3D scenes. I also learned the basic skills of Blender to create and edit 3D models.",
        items: [
            {
                title: "Three.js",
                description: "(WebGL, 3D scenes, animations, interactions)",
            },
            {
                title: "Blender",
                description: "(3D modeling, materials, basic scene setup)",
            },
        ],
    },
];
export const projects = [
    {
        id: 1,
        name: "Food Waste Savior",
        description:
            "A platform built to reduce food waste by connecting customers with local businesses that have surplus food that is still fresh and delicious. With a memorable brand identity, a friendly mascot, and a simple user experience, it creates a triple win for customers, merchants, and most importantly, the Earth.",
        href: "https://github.com/ShowGa/FoodWasteSavior",
        image: "/assets/projects/foodwaste.webp",
        bgImage: "/assets/backgrounds/blanket.webp",
        frameworks: [
            { id: 1, name: "React" },
            { id: 2, name: "Tailwind CSS" },
            { id: 3, name: "Java" },
            { id: 4, name: "Spring Boot" },
            { id: 5, name: "Mapbox" },
        ],
    },
    {
        id: 2,
        name: "Online Chess",
        description:
            "A real-time multiplayer chess game where two players can compete online and play against each other in real time. Players can also communicate through real-time text chat and send instant emoji reactions during the game, creating a more interactive and social gaming experience.",
        href: "https://github.com/ShowGa/Play-Chess",
        image: "/assets/projects/chess.webp",
        bgImage: "/assets/backgrounds/poster.webp",
        frameworks: [
            { id: 1, name: "React" },
            { id: 2, name: "React-Chessboard" },
            { id: 3, name: "Chessjs" },
            { id: 4, name: "Socket.io-client" },
            { id: 5, name: "Nodejs" },
            { id: 6, name: "Expressjs" },
            { id: 7, name: "Socket.io" },
        ],
    },
    {
        id: 3,
        name: "ShowGa 3D room",
        description:
            "An interactive 3D website built with Three.js and GLSL, inspired by my idea of a dream room — a space for gaming, chilling, and working. It also features an embedded iframe of my online chess project, allowing users to play chess directly inside the 3D room.",
        href: "https://github.com/ShowGa/ShowGa_Room_ThreeJS",
        image: "/assets/projects/room.webp",
        bgImage: "/assets/backgrounds/curtains.webp",
        frameworks: [
            { id: 1, name: "React" },
            { id: 2, name: "Threejs" },
            { id: 3, name: "React Three Fiber" },
            { id: 4, name: "React Three Drei" },
            { id: 5, name: "Zuatand" },
            { id: 6, name: "Blender" },
        ],
    },
    {
        id: 4,
        name: "ShowGa Playing Card 3D E-commerce",
        description:
            "A 3D e-commerce website for practicing vue and nuxt, designed to showcase the cards through interactive 3D visuals and animations. Users can explore the products from different angles, interact with the 3D cards, and enjoy a more immersive shopping experience.",
        href: "https://github.com/ShowGa/Playing-Card-3D-E-commerce",
        image: "/assets/projects/playingcard.webp",
        bgImage: "/assets/backgrounds/map.webp",
        frameworks: [
            { id: 1, name: "Vue3" },
            { id: 2, name: "Nuxt" },
            { id: 3, name: "Threejs" },
            { id: 4, name: "Tresjs" },
            { id: 5, name: "Tresjs/Cientos" },
            { id: 6, name: "Stripe" },
            { id: 7, name: "Prismic headless CMS" },
            { id: 8, name: "Blender" },
        ],
    },
];
export const socials = [{ name: "GitHub", href: "https://github.com/ShowGa" }];
