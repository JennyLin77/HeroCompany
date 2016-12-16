"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 1, name: 'Jenny' },
            { id: 2, name: 'Sunny' },
            { id: 3, name: 'Scott' },
            { id: 4, name: 'Rick' },
            { id: 5, name: 'Mary' },
            { id: 6, name: 'Glenn' },
            { id: 7, name: 'Mike' },
            { id: 8, name: 'John' },
            { id: 9, name: 'Lucky' },
            { id: 10, name: 'Jane' }
        ];
        return { heroes: heroes };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map