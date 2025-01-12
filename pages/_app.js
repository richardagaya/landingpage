// pages/_app.js
import '../styles/globals.css';  // Update the path according to the actual location

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
