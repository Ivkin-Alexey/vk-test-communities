export function fetchGroups() {
        return fetch("groups.json")
            .then(response => response.json())
}