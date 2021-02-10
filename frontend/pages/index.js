const Home = ({ restaurants, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
};
Home.getInitialProps = async ctx => {
  try {
    // Parses the JSON returned by a network request
    const parseJSON = resp => (resp.json ? resp.json() : resp);
    // Checks if a network request came back fine, and throws an error if not
    const checkStatus = resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then(resp => {
        throw resp;
      });
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const restaurants = await fetch('http://backend:1337/restaurants', {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(parseJSON);

    return { restaurants };
  } catch (error) {
    return { error };
  }
};

export default Home;