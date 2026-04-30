import { toast } from 'sonner';
import { ShoppingCart, Heart, CheckCircle2, XCircle, PackageCheck, Tag, Link } from 'lucide-react';
import React from 'react';

export const addToCart = (itemName: string) => {
  toast.success(`Added ${itemName} to cart`, {
    icon: React.createElement(ShoppingCart, { className: "w-5 h-5" }),
  });
};

export const removeFromCart = () => {
  toast('Removed item from cart', {
    icon: React.createElement(ShoppingCart, { className: "w-5 h-5 text-gray-500" }),
  });
};

export const wishlistToggle = (added: boolean) => {
  if (added) {
    toast.success('Added to wishlist', {
      icon: React.createElement(Heart, { className: "w-5 h-5 text-red-500 fill-current" }),
    });
  } else {
    toast('Removed from wishlist', {
      icon: React.createElement(Heart, { className: "w-5 h-5 text-gray-500" }),
    });
  }
};

export const loginSuccess = () => {
  toast.success('Successfully logged in', {
    icon: React.createElement(CheckCircle2, { className: "w-5 h-5 text-green-500" }),
  });
};

export const loginFail = () => {
  toast.error('Login failed', {
    icon: React.createElement(XCircle, { className: "w-5 h-5 text-red-500" }),
  });
};

export const orderPlaced = (orderNumber: string) => {
  toast.success(`Order placed successfully! Order #${orderNumber}`, {
    icon: React.createElement(PackageCheck, { className: "w-5 h-5 text-green-500" }),
  });
};

export const discountApplied = (savings: string) => {
  toast.success(`Discount code applied! You saved ${savings}`, {
    icon: React.createElement(Tag, { className: "w-5 h-5 text-green-500" }),
  });
};

export const discountInvalid = () => {
  toast.error('Invalid discount code', {
    icon: React.createElement(XCircle, { className: "w-5 h-5 text-red-500" }),
  });
};

export const outOfStock = () => {
  toast.error('Item is out of stock', {
    icon: React.createElement(XCircle, { className: "w-5 h-5 text-red-500" }),
  });
};

export const copyLink = () => {
  toast.success('Link copied to clipboard', {
    icon: React.createElement(Link, { className: "w-5 h-5 text-blue-500" }),
  });
};
