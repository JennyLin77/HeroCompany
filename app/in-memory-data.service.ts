import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let heroes = [
			{id: 1, name: 'Jenny'},
			{id: 2, name: 'Sunny'},
			{id: 3, name: 'Scott'},
			{id: 4, name: 'Rick'},
			{id: 5, name: 'Mary'},
			{id: 6, name: 'Glenn'},
			{id: 7, name: 'Mike'},
			{id: 8, name: 'John'},
			{id: 9, name: 'Lucky'},
			{id: 10, name: 'Jane'}
		];
		return {heroes};
	}
}