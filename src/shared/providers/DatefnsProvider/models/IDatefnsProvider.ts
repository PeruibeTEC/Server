export default interface IDatefnsProvider {
  thisDateIsAfter(date: string): Promise<boolean>;
}
