const API = {
    fetchTasks() {
        return new Promise((resolve, reject) => {
            console.log("Fetching tasks..."); 
            setTimeout(() => {
                const data = [
                    { id: 1, title: "Study JavaScript", completed: false },
                    { id: 2, title: "Practice DOM", completed: true },
                    { id: 3, title: "Read Async Patterns", completed: false }
                ];
                resolve(data); 
            }, 1500);
        });
    }
};