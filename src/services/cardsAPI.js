import axios from "axios";
const boardId = '9206728921179140002';
const AccessToken = 'a4468a4d-85ae-432d-b552-7dfd9d40ac67';

class cardsAPI {

    static async getCards() {
        try {
            const response = await axios.get(`/boards/${boardId}/tasks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }
    
    static async postNewCard(taskData) {
        try {
            const response = await axios.post(`/boards/${boardId}/tasks`, taskData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }
    
    static async updateCard(taskData) {
        try {
            const response = await axios.put(`/boards/${boardId}/tasks`, taskData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    static async deleteCard(taskData) {
        try {
            await axios.delete(`/boards/${boardId}/tasks`, { 
                data: taskData,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }

}

export default cardsAPI;
