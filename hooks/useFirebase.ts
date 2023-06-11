import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCVl3TJ0afZnkpsGAMRctfEzn9jMaTHup8",
	authDomain: "diu-ems.firebaseapp.com",
	projectId: "diu-ems",
	storageBucket: "diu-ems.appspot.com",
	messagingSenderId: "354968863253",
	appId: "1:354968863253:web:fdd9777a25da141f74441c",
	measurementId: "G-YBYVCTTTQG"
};

const initializeAuthentication = () => {
	initializeApp(firebaseConfig);
};

export default initializeAuthentication;
