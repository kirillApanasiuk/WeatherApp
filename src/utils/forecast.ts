import request from 'request';

interface IForecastFn {
  (
    coordinates: { lat: number; long: number },
    callback: (error: Object | undefined, data: Object | undefined) => void,
  ): void;
}

export const forecast: IForecastFn = ({ lat, long }, callback) => {
  console.log(lat, long);
  const url: string =
    'http://api.weatherstack.com/current' +
    '?access_key=9da9d4c53c4cb32621e2c5db072c8525&query=' +
    long +
    ',' +
    lat;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        "Unable connect to weatherStack,please check you're internet connection.",
        undefined,
      );
    } else {
      if (response.body.error) {
        callback(response.body.info, undefined);
      } else {
        callback(
          `Forecast in ${response.body.location.name} .It is currently ${response.body.current.temperature} degrees of temperature.But feels like ${response.body.current.feelslike}`,
          undefined,
        );
      }
    }
  });
};
