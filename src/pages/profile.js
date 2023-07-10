import { useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Profile({ type, userId, userType, changePage }) {


    return (
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <p>Profle Page</p>
            </div>
        </div>
    );
}