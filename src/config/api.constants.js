
const BASE_URL = window.location.host.includes('localhost') ? 'http://localhost:8001' : '';
export const config = {
    createUser: `${BASE_URL}/api/user/`,
    fetchUsers: `${BASE_URL}/api/user/`,
    deleteUser: `${BASE_URL}/api/user/`,
    addCalorieIn: `${BASE_URL}/api/caloriein/`,
    addCalorieOut: `${BASE_URL}/api/calorieout/`,
    fetchNetCalorie: `${BASE_URL}/api/calorie/`,
    fetchActivities: `${BASE_URL}/api/activity/`,
    fetchFoods: `${BASE_URL}/api/food/`,
}