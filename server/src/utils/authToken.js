
export default function generateEmailAuthToken() {
    
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    return verificationToken;
}