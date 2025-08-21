const BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`,
      ...(options.headers || {}),
    },
    ...options,
  };

  const response = await fetch(url, config);


  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log("errorData");
        console.log(errorData);

    console.log(errorData.message);
    return {status: false, result: errorData.message};
  
  }
  const data = await response.json();

  return {status: true, result: data};
}
