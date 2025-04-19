import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const athurizationGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
        alert("You are not logged in, please login.");
        router.navigate(['security/login']);
        return false;
    }

    try {
        // ✅ فك تشفير التوكن واستخراج الدور الصحيح
        const decodedUser: any = jwtDecode(token);
        const role1 = Number(decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']); // ✅ تحويل إلى رقم
        console.log("User Role:", role1);

        // ✅ التحقق من الوصول إلى صفحات "Admin"
        if (state.url.includes('admin')) {
            if (role1 === 1) { 
                console.log("Admin Access Granted");
                return true; // ✅ السماح بالدخول للأدمن
            } else {
                alert("This page is for Admins only.");
                router.navigate(['/login']);
                return false;
            }
        }

        // ✅ التحقق من الوصول إلى صفحات "User"
        if (state.url.includes('user')) {
            if (role1 === 2) { 
                console.log("User Access Granted");
                return true; // ✅ السماح بالدخول للمستخدم العادي
            } else {
                alert("This page is for Users only.");
                router.navigate(['/login']);
                return false;
            }
        }

    } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid token, please login again.");
        router.navigate(['/login']);
        return false;
    }

    // ✅ في حالة لم تتطابق أي شروط
    alert("You are not authorized to access this page.");
    router.navigate(['security/login']);
    return false;
};
