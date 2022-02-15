{
  const grabData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");

    if (response.status !== 200) {
      throw new Error("Unable to load data request");
    }

    const data = await response.json();

    return data;
  };

  grabData()
    .then((data) => {
      dataRequest(data);
    })
    .catch((err) => console.log("reject:", err.message));
}
