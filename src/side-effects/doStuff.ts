

export function doStuff(): Promise<any> {
  console.log("side effecting!");
  return fetch(`https://tourney-service.herokuapp.com/tourney`)
      .then((response: Response) => {
        return response.json()
      })
      .then(json => {
        console.log(`response: ${JSON.stringify(json)}`);
      });
}