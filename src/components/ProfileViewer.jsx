import React, { useState, useEffect } from 'react';

function ProfileViewer() {
  const [username, setUsername] = useState('rahulpadole11');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Live Search Effect
  useEffect(() => {
    if (username.trim() === '') {
      setProfile(null);
      setRepos([]);
      setError('');
      return;
    }

    const delayFetch = setTimeout(() => {
      fetchProfile();
      fetchRepos();
    }, 800); // debounce

    return () => clearTimeout(delayFetch);
  }, [username]);

  // Fetch GitHub Profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setProfile(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setProfile(null);
    }
  };

  // Fetch Repositories
  const fetchRepos = async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!res.ok) throw new Error('Repos not found');
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setRepos([]);
    }
  };

  // Styles
  const mainClass = darkMode ? 'bg-gray-900 text-white min-h-screen p-6' : 'bg-gray-100 text-white min-h-screen p-6';

  return (
    <div className={mainClass}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold 
            ${darkMode ? ' text-white' : ' text-black'}`}>
            
            
            🔍 GitHub Profile Viewer</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 cursor-pointer ${
            darkMode ? ' text-white' : ' text-black'
          }`}
        
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        className={`w-full px-4 py-2 mb-4 border rounded ${
            darkMode ? ' text-white' : ' text-black'
        } `}
      />

      {error && <p className="text-red-500 text-lg">{error}</p>}

      {profile && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-4">
          <div className="flex items-center gap-6">
            <img src={profile.avatar_url} alt="avatar" className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">{profile.name || 'No Name Provided'}</h2>
              <p className="text-sm text-gray-100">@{profile.login}</p>
              <p>{profile.bio || 'No bio available'}</p>
              <p>📍 {profile.location || 'Unknown'}</p>
              {profile.company && <p>🏢 {profile.company}</p>}
              {profile.twitter_username && (
                <p>
                  🐦 <a href={`https://twitter.com/${profile.twitter_username}`} target="_blank" rel="noreferrer" className="text-blue-500">
                    @{profile.twitter_username}
                  </a>
                </p>
              )}
              <p>📦 Public Repos: {profile.public_repos}</p>
              <p>👥 Followers: {profile.followers} | Following: {profile.following}</p>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 inline-block">
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className={`mt-6 ${
            darkMode ? ' text-white' : ' text-black'
        }`}>
          <h3 className="text-xl font-bold mb-4">🧾 Repositories</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <li key={repo.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h4 className="font-semibold">{repo.name}</h4>
                <p className="text-sm text-gray-500">{repo.description || 'No description'}</p>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-500 mt-2 inline-block">
                  🔗 View Repo
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileViewer;
