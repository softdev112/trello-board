import axios from "axios";
const boardId = '9206728921179140002';
const AccessToken = 'a4468a4d-85ae-432d-b552-7dfd9d40ac67';

class listsAPI {

    static async getLists() {
        try {
            const response = await axios.get(`/boards/${boardId}/groups`, {
                headers: {
                'Content-Type': 'application/json',
                'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching groups:', error);
            throw error;
        }
    }

    static async updateList(groupData) {
        try {
            const response = await axios.put(`/boards/${boardId}/groups`, groupData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating group:', error);
            throw error;
        }
    }

    static async createList(groupData) {
        try {
            const response = await axios.post(`/boards/${boardId}/groups`, groupData,
                {
                    headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    static async deleteList(groupData) {
        try {
            await axios.delete(`/boards/${boardId}/groups`, { 
                data: groupData,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Token': AccessToken
                },
            });
        } catch (error) {
            console.error('Error deleting group:', error);
            throw error;
        }
    }

}

export default listsAPI;
