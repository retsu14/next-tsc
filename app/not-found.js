
import Link from 'next/link';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '5rem', marginBottom: '20px' }}>404 - Page Not Found</h1>
            <p style={{ fontSize: '1.2rem' }}>
                Sorry, the page you are looking for doesn't exist.
            </p>
            <Link href="/" style={{ fontSize: '1.2rem', color: 'blue' }}>
                Go back to the homepage
            </Link>
        </div>
    );
};

export default NotFound;
