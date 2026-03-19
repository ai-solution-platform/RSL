'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const { language } = useTranslation();
  const isEn = language === 'en';

  // General settings
  const [platformName, setPlatformName] = useState('RSL - Retail Space Leasing');
  const [contactEmail, setContactEmail] = useState('admin@rsl-platform.com');
  const [supportPhone, setSupportPhone] = useState('+66-2-000-0000');

  // Commission rates
  const [dealFee, setDealFee] = useState('5');
  const [insuranceCommission, setInsuranceCommission] = useState('10');

  // Content moderation
  const [autoApprove, setAutoApprove] = useState(false);
  const [requireVerification, setRequireVerification] = useState(true);

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSave = () => {
    alert(isEn ? 'Settings saved successfully!' : 'บันทึกการตั้งค่าสำเร็จ!');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEn ? 'Platform Settings' : 'ตั้งค่าแพลตฟอร์ม'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEn ? 'Configure platform behavior and preferences' : 'กำหนดค่าพฤติกรรมและการตั้งค่าแพลตฟอร์ม'}
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">
          {isEn ? 'General Settings' : 'ตั้งค่าทั่วไป'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEn ? 'Platform Name' : 'ชื่อแพลตฟอร์ม'}
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEn ? 'Contact Email' : 'อีเมลติดต่อ'}
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEn ? 'Support Phone' : 'โทรศัพท์สนับสนุน'}
            </label>
            <input
              type="tel"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Commission Rates */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">
          {isEn ? 'Commission Rates' : 'อัตราค่าคอมมิชชั่น'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEn ? 'Deal Fee (%)' : 'ค่าธรรมเนียมดีล (%)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={dealFee}
                onChange={(e) => setDealFee(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEn ? 'Insurance Commission (%)' : 'ค่าคอมมิชชั่นประกัน (%)'}
            </label>
            <div className="relative">
              <input
                type="number"
                value={insuranceCommission}
                onChange={(e) => setInsuranceCommission(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Moderation */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">
          {isEn ? 'Content Moderation' : 'การกลั่นกรองเนื้อหา'}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isEn ? 'Auto-approve listings' : 'อนุมัติประกาศอัตโนมัติ'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isEn
                  ? 'Listings will go live immediately without admin review'
                  : 'ประกาศจะเผยแพร่ทันทีโดยไม่ต้องรอตรวจสอบ'}
              </p>
            </div>
            <button
              onClick={() => setAutoApprove(!autoApprove)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoApprove ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                  autoApprove ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isEn ? 'Require verification' : 'ต้องการการยืนยันตัวตน'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isEn
                  ? 'Users must verify identity before posting or making deals'
                  : 'ผู้ใช้ต้องยืนยันตัวตนก่อนโพสต์หรือทำดีล'}
              </p>
            </div>
            <button
              onClick={() => setRequireVerification(!requireVerification)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                requireVerification ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                  requireVerification ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-900 mb-4">
          {isEn ? 'Notification Settings' : 'ตั้งค่าการแจ้งเตือน'}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isEn ? 'Email Notifications' : 'การแจ้งเตือนทางอีเมล'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isEn ? 'Receive email alerts for important events' : 'รับอีเมลแจ้งเตือนสำหรับเหตุการณ์สำคัญ'}
              </p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                  emailNotifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isEn ? 'SMS Notifications' : 'การแจ้งเตือนทาง SMS'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {isEn ? 'Receive SMS alerts for critical events' : 'รับ SMS แจ้งเตือนสำหรับเหตุการณ์สำคัญ'}
              </p>
            </div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                  smsNotifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          {isEn ? 'Save Settings' : 'บันทึกการตั้งค่า'}
        </button>
      </div>
    </div>
  );
}
