import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUpForm from './components/signUpForm';

const App = () => {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <Router>
            <div>
                <h1>Welcome to Your App</h1>
                <div>
                    <h2>Select Role:</h2>
                    <button onClick={() => setSelectedRole('user')}>User</button>
                    <button onClick={() => setSelectedRole('admin')}>Admin</button>
                </div>

                {selectedRole && (
                    <Route>
                        <Route path="/signup">
                            <SignUpForm role={selectedRole} />
                        </Route>
                        {/* Add other routes as needed */}
                    </Route>
                )}
            </div>
        </Router>
    );
};

export default App;
