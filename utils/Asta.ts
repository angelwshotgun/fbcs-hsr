export default class Asta {
  name = 'Asta';
  baseSpeed = 106;
  currentSpeed = 106;
  AVList: number[] = [];

  ultimate(team): void {
    team.forEach((member) => {
      member.AVList = member.AVList.map((item: number) => {
        return Math.round(item * (this.currentSpeed / (this.baseSpeed + 50)));
      });
      member.currentSpeed += 50;
    });
  }
}
