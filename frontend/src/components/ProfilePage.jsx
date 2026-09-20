import React, { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  ShieldCheck, 
  Car, 
  Settings, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Download, 
  Printer,
  ExternalLink, 
  Plus, 
  Save, 
  Trash2, 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const ProfilePage = ({ onNavigateHome, onSelectEdition }) => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState('orders');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // User Profile State (persisted to localStorage)
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('kz_profile_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load profile from localStorage', e);
    }
    return {
      fullName: 'Hamad Al-Kuwari',
      email: 'h.alkuwari@domain.qa',
      phone: '+974 5512 8900',
      country: 'Qatar',
      city: 'Doha',
      address: 'Zone 55, Street 920, Villa 14',
      membershipTier: 'Black Chrome VIP',
      memberSince: '2024'
    };
  });

  // User Vehicles State
  const [vehicles, setVehicles] = useState(() => {
    try {
      const saved = localStorage.getItem('kz_user_vehicles');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load vehicles', e);
    }
    return [
      {
        id: 1,
        make: 'Toyota',
        model: 'Land Cruiser LC300 GR-Sport',
        year: '2024',
        plate: '54921 Doha',
        installedActuator: 'Kazez Black Chrome (SN: KZ-88912)',
        isPrimary: true
      },
      {
        id: 2,
        make: 'Nissan',
        model: 'Patrol Y62 Desert V8',
        year: '2023',
        plate: '11804 Al Rayyan',
        installedActuator: 'Pending Installation (Silver Edition)',
        isPrimary: false
      }
    ];
  });

  // New vehicle modal / form state
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ make: 'Toyota', model: '', year: '2024', plate: '' });

  // Sample Orders History
  const [orders] = useState([
    {
      id: 'KZ-942817',
      date: 'Sept 14, 2026',
      status: 'DISPATCHED',
      statusLabelEn: 'Express Courier in Transit',
      statusLabelAr: 'في الطريق مع المندوب السريع',
      items: [
        {
          sku: 'KAZEZ',
          name: 'Kazez Antenna Motor (Black Edition)',
          price: 350,
          quantity: 1,
          thumbnail: '/assets/images/motor-black.webp'
        }
      ],
      total: 350,
      trackingNumber: 'Q-EX-992148',
      vehicle: '2024 Toyota Land Cruiser LC300'
    },
    {
      id: 'KZ-812049',
      date: 'Aug 02, 2026',
      status: 'DELIVERED',
      statusLabelEn: 'Delivered & Doha Fitted',
      statusLabelAr: 'تم التسليم والتركيب بالدوحة',
      items: [
        {
          sku: 'KAZEZ-SLVR',
          name: 'Kazez Antenna Motor (Silver Edition)',
          price: 350,
          quantity: 1,
          thumbnail: '/assets/images/motor-silver.webp'
        }
      ],
      total: 350,
      trackingNumber: 'Q-EX-841029',
      vehicle: '2023 Nissan Patrol Y62'
    }
  ]);

  // Warranties List
  const [warranties] = useState([
    {
      serial: 'SN-KZ88912-QA',
      sku: 'KAZEZ',
      edition: 'Black Edition (Tactile Chrome)',
      registeredDate: 'Sept 14, 2026',
      expiryDate: 'Sept 14, 2027',
      daysLeft: 362,
      status: 'ACTIVE',
      vehicle: 'Toyota Land Cruiser LC300 GR-Sport'
    },
    {
      serial: 'SN-KZ72104-QA',
      sku: 'KAZEZ-SLVR',
      edition: 'Silver Edition (Mirror Chrome)',
      registeredDate: 'Aug 02, 2026',
      expiryDate: 'Aug 02, 2027',
      daysLeft: 319,
      status: 'ACTIVE',
      vehicle: 'Nissan Patrol Y62 Desert V8'
    }
  ]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('kz_profile_data', JSON.stringify(profileData));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.model) return;
    const updated = [
      ...vehicles,
      {
        id: Date.now(),
        ...newVehicle,
        installedActuator: 'Not Assigned',
        isPrimary: vehicles.length === 0
      }
    ];
    setVehicles(updated);
    localStorage.setItem('kz_user_vehicles', JSON.stringify(updated));
    setShowAddVehicle(false);
    setNewVehicle({ make: 'Toyota', model: '', year: '2024', plate: '' });
  };

  const handleDeleteVehicle = (id) => {
    const updated = vehicles.filter((v) => v.id !== id);
    setVehicles(updated);
    localStorage.setItem('kz_user_vehicles', JSON.stringify(updated));
  };

  const handleSetPrimaryVehicle = (id) => {
    const updated = vehicles.map((v) => ({
      ...v,
      isPrimary: v.id === id
    }));
    setVehicles(updated);
    localStorage.setItem('kz_user_vehicles', JSON.stringify(updated));
  };

  return (
    <div className="kz-profile-section">
      <div className="kz-container">
        {/* Top Back Nav */}
        <div className="kz-pdp-topbar" style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className="kz-btn kz-btn-secondary kz-btn-island kz-btn-sm"
            onClick={onNavigateHome}
          >
            <span className="kz-btn-island-icon">
              {isRtl ? '→' : '←'}
            </span>
            <span>{t.pdp.backToStorefront}</span>
          </button>
        </div>

        {/* Profile Header Hero Card */}
        <div className="kz-profile-hero-card">
          <div className="kz-profile-hero-left">
            <div className="kz-profile-avatar">
              {profileData.fullName
                ? profileData.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                : 'KZ'}
            </div>
            <div className="kz-profile-hero-info">
              <div className="kz-profile-badge-row">
                <span className="kz-tag-telemetry">
                  <span className="kz-live-indicator" /> {profileData.membershipTier}
                </span>
                <span className="kz-chip" style={{ fontSize: '0.68rem' }}>
                  {profileData.city}, {profileData.country}
                </span>
              </div>
              <h1 className="kz-profile-name">{profileData.fullName}</h1>
              <div className="kz-profile-meta">
                <span><Phone size={12} /> {profileData.phone}</span>
                <span><Mail size={12} /> {profileData.email}</span>
                <span><Clock size={12} /> {isRtl ? 'عضو منذ' : 'Member since'} {profileData.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="kz-profile-hero-stats">
            <div className="kz-profile-stat-box">
              <div className="kz-profile-stat-num">{orders.length}</div>
              <div className="kz-profile-stat-lbl">{isRtl ? 'الطلبات المكتملة' : 'Completed Orders'}</div>
            </div>
            <div className="kz-profile-stat-box">
              <div className="kz-profile-stat-num">{warranties.length}</div>
              <div className="kz-profile-stat-lbl">{isRtl ? 'أجهزة بالضمان' : 'Active Warranties'}</div>
            </div>
            <div className="kz-profile-stat-box">
              <div className="kz-profile-stat-num">{vehicles.length}</div>
              <div className="kz-profile-stat-lbl">{isRtl ? 'المركبات المسجلة' : 'Garage Vehicles'}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="kz-profile-nav-tabs">
          <button
            type="button"
            className={`kz-profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} />
            <span>{isRtl ? 'الطلبات والشحنات' : 'Orders & Shipments'}</span>
            <span className="kz-profile-tab-count">{orders.length}</span>
          </button>

          <button
            type="button"
            className={`kz-profile-tab ${activeTab === 'garage' ? 'active' : ''}`}
            onClick={() => setActiveTab('garage')}
          >
            <Car size={16} />
            <span>{isRtl ? 'مرآب المركبات' : 'My Vehicle Garage'}</span>
            <span className="kz-profile-tab-count">{vehicles.length}</span>
          </button>

          <button
            type="button"
            className={`kz-profile-tab ${activeTab === 'warranties' ? 'active' : ''}`}
            onClick={() => setActiveTab('warranties')}
          >
            <ShieldCheck size={16} />
            <span>{isRtl ? 'الضمانات والتراخيص' : 'Hardware Warranties'}</span>
            <span className="kz-profile-tab-count">{warranties.length}</span>
          </button>

          <button
            type="button"
            className={`kz-profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            <span>{isRtl ? 'البيانات والعنوان' : 'Account & Delivery'}</span>
          </button>
        </div>

        {/* Tab 1: Orders & Dispatches */}
        {activeTab === 'orders' && (
          <div className="kz-profile-tab-content">
            <div className="kz-profile-section-head">
              <div>
                <h3 className="kz-profile-section-title">{isRtl ? 'سجل الطلبات والشحنات الفورية' : 'Order History & Real-Time Tracking'}</h3>
                <p className="kz-profile-section-sub">{isRtl ? 'تتبع شحناتك المباشرة من مركز الدوحة اللوجستي أو حمّل فواتير الشراء' : 'Track your Qatar stock dispatches or download official purchase receipts'}</p>
              </div>
            </div>

            <div className="kz-orders-list">
              {orders.map((order) => (
                <div key={order.id} className="kz-order-card">
                  <div className="kz-order-card-header">
                    <div className="kz-order-header-left">
                      <span className="kz-order-id">{order.id}</span>
                      <span className="kz-order-date">{order.date}</span>
                      <span className="kz-chip" style={{ fontSize: '0.68rem' }}>{order.vehicle}</span>
                    </div>

                    <div className="kz-order-header-right">
                      <span className={`kz-status-badge ${order.status.toLowerCase()}`}>
                        {order.status === 'DISPATCHED' ? <Truck size={13} /> : <CheckCircle2 size={13} />}
                        {isRtl ? order.statusLabelAr : order.statusLabelEn}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="kz-order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="kz-order-item-row">
                        <img src={item.thumbnail} alt={item.name} className="kz-order-item-img" />
                        <div className="kz-order-item-details">
                          <h4 className="kz-order-item-name">{item.name}</h4>
                          <span className="kz-order-item-sku">SKU: {item.sku} · Qty: {item.quantity}</span>
                        </div>
                        <div className="kz-order-item-price">
                          <PriceTag amount={item.price * item.quantity} size="card" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer Actions */}
                  <div className="kz-order-card-footer">
                    <div className="kz-tracking-info">
                      <span style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)' }}>
                        {isRtl ? 'رقم التتبع:' : 'Courier Tracking:'}
                      </span>
                      <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.78rem', color: '#fff' }}>
                        {order.trackingNumber}
                      </span>
                    </div>

                    <div className="kz-order-actions">
                      <button
                        type="button"
                        className="kz-btn kz-btn-secondary kz-btn-sm"
                        onClick={() => {
                          window.location.hash = 'order-success';
                        }}
                      >
                        <Printer size={13} /> {isRtl ? 'طباعة الإيصال الرسمي (PDF)' : 'Print Official Receipt'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Vehicle Garage */}
        {activeTab === 'garage' && (
          <div className="kz-profile-tab-content">
            <div className="kz-profile-section-head">
              <div>
                <h3 className="kz-profile-section-title">{isRtl ? 'مرآب المركبات المعتمدة' : 'Registered Overland Vehicles'}</h3>
                <p className="kz-profile-section-sub">{isRtl ? 'أضف مركباتك لتسريع عملية الطلب وتعيين قواعد التثبيت المتوافقة' : 'Assign custom mounting brackets and streamline future 1-click orders'}</p>
              </div>

              <button
                type="button"
                className="kz-btn kz-btn-primary kz-btn-island kz-btn-sm"
                onClick={() => setShowAddVehicle(!showAddVehicle)}
              >
                <span>{isRtl ? 'إضافة مركبة جديدة' : 'Add Vehicle'}</span>
                <span className="kz-btn-island-icon">
                  <Plus size={13} />
                </span>
              </button>
            </div>

            {/* Add Vehicle Form */}
            {showAddVehicle && (
              <form className="kz-add-vehicle-card" onSubmit={handleAddVehicle}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 500, marginBottom: '14px', color: '#fff' }}>
                  {isRtl ? 'تسجيل مركبة جديدة في الحساب' : 'Register New Vehicle in Garage'}
                </h4>
                <div className="kz-form-grid-3">
                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'صانع المركبة' : 'Make'}</label>
                    <select
                      className="kz-input"
                      value={newVehicle.make}
                      onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                    >
                      <option value="Toyota">Toyota</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Land Rover">Land Rover</option>
                      <option value="Ford">Ford</option>
                      <option value="Jeep">Jeep</option>
                    </select>
                  </div>

                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'الموديل والتجهيز' : 'Model & Trim'}</label>
                    <input
                      type="text"
                      className="kz-input"
                      placeholder="e.g. Land Cruiser LC300 VXR"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      required
                    />
                  </div>

                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'سنة الصنع' : 'Year'}</label>
                    <select
                      className="kz-input"
                      value={newVehicle.year}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    >
                      {['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', 'Heritage'].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary kz-btn-sm"
                    onClick={() => setShowAddVehicle(false)}
                  >
                    {isRtl ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button type="submit" className="kz-btn kz-btn-primary kz-btn-sm">
                    {isRtl ? 'حفظ المركبة' : 'Save to Garage'}
                  </button>
                </div>
              </form>
            )}

            {/* Vehicles Cards Grid */}
            <div className="kz-vehicles-grid">
              {vehicles.map((v) => (
                <div key={v.id} className={`kz-vehicle-card ${v.isPrimary ? 'primary-vehicle' : ''}`}>
                  <div className="kz-vehicle-card-top">
                    <div className="kz-vehicle-icon-wrap">
                      <Car size={24} color={v.isPrimary ? 'var(--kz-racing-red)' : '#fff'} />
                    </div>
                    <div>
                      <h4 className="kz-vehicle-title">{v.make} {v.model}</h4>
                      <span className="kz-vehicle-year">{v.year} {isRtl ? 'موديل' : 'Edition'}</span>
                    </div>
                    {v.isPrimary && (
                      <span className="kz-tag-telemetry" style={{ marginLeft: isRtl ? '0' : 'auto', marginRight: isRtl ? 'auto' : '0' }}>
                        {isRtl ? 'المركبة الرئيسية' : 'Primary Vehicle'}
                      </span>
                    )}
                  </div>

                  <div className="kz-vehicle-specs-box">
                    <div className="kz-veh-spec-row">
                      <span>{isRtl ? 'المحرك المثبت:' : 'Installed Hardware:'}</span>
                      <strong style={{ color: '#fff' }}>{v.installedActuator}</strong>
                    </div>
                  </div>

                  <div className="kz-vehicle-card-actions">
                    {!v.isPrimary && (
                      <button
                        type="button"
                        className="kz-btn kz-btn-secondary kz-btn-sm"
                        onClick={() => handleSetPrimaryVehicle(v.id)}
                      >
                        {isRtl ? 'تعيين كرئيسية' : 'Set as Primary'}
                      </button>
                    )}
                    <button
                      type="button"
                      className="kz-btn kz-btn-secondary kz-btn-sm"
                      onClick={() => handleDeleteVehicle(v.id)}
                      style={{ color: 'var(--kz-text-muted)' }}
                      aria-label="Delete vehicle"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Hardware Warranties */}
        {activeTab === 'warranties' && (
          <div className="kz-profile-tab-content">
            <div className="kz-profile-section-head">
              <div>
                <h3 className="kz-profile-section-title">{isRtl ? 'الضمانات المباشرة والتراخيص' : 'Direct Replacement Warranties'}</h3>
                <p className="kz-profile-section-sub">{isRtl ? 'جميع محركات كازيز المعتمدة مشمولة بضمان استبدال مباشر لمدة عام كامل' : 'All authentic Kazez actuators include 1-Year direct replacement warranty against desert fatigue and ingress'}</p>
              </div>
            </div>

            <div className="kz-warranties-grid">
              {warranties.map((w, idx) => (
                <div key={idx} className="kz-warranty-card">
                  <div className="kz-warranty-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck size={24} color="var(--kz-racing-red)" />
                      <div>
                        <h4 className="kz-warranty-title">{w.edition}</h4>
                        <span className="kz-warranty-serial">{w.serial}</span>
                      </div>
                    </div>

                    <span className="kz-tag-telemetry">
                      <span className="kz-live-indicator" /> {isRtl ? 'ضمان ساري' : 'ACTIVE'}
                    </span>
                  </div>

                  <div className="kz-warranty-body">
                    <div className="kz-warranty-stat">
                      <span className="kz-w-lbl">{isRtl ? 'الأيام المتبقية في الضمان' : 'Remaining Coverage'}</span>
                      <span className="kz-w-val" style={{ color: 'var(--kz-racing-red)', fontSize: '1.4rem' }}>
                        {w.daysLeft} {isRtl ? 'يوم' : 'Days'}
                      </span>
                    </div>

                    <div className="kz-warranty-details-list">
                      <div className="kz-w-row">
                        <span>{isRtl ? 'تاريخ التسجيل:' : 'Registered Date:'}</span>
                        <strong>{w.registeredDate}</strong>
                      </div>
                      <div className="kz-w-row">
                        <span>{isRtl ? 'تاريخ انتهاء الصلاحية:' : 'Expires On:'}</span>
                        <strong>{w.expiryDate}</strong>
                      </div>
                      <div className="kz-w-row">
                        <span>{isRtl ? 'المركبة المقترنة:' : 'Assigned Vehicle:'}</span>
                        <strong>{w.vehicle}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="kz-warranty-footer">
                    <a
                      href={`https://wa.me/97455128900?text=${encodeURIComponent(`Hello Kazez, I would like technical concierge support for warranty ${w.serial}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="kz-btn kz-btn-secondary kz-btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <ExternalLink size={13} /> {isRtl ? 'طلب خدمة ضمان مباشر عبر الواتساب' : 'Direct Warranty Claim & Concierge'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Account & Delivery Settings */}
        {activeTab === 'settings' && (
          <div className="kz-profile-tab-content">
            <div className="kz-profile-section-head">
              <div>
                <h3 className="kz-profile-section-title">{isRtl ? 'البيانات الشخصية وعنوان التسليم' : 'Personal & Delivery Address Details'}</h3>
                <p className="kz-profile-section-sub">{isRtl ? 'تحديث بيانات الاتصال لتلقي إشعارات الشحن المباشر' : 'Keep your contact and destination address updated for priority GCC dispatch'}</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="kz-save-alert">
                <CheckCircle2 size={16} color="#25d366" />
                <span>{isRtl ? 'تم حفظ التعديلات بنجاح في ملفك الشخصي!' : 'Profile details and delivery preferences successfully saved!'}</span>
              </div>
            )}

            <form className="kz-settings-form" onSubmit={handleSaveProfile}>
              <div className="kz-form-section">
                <h4 className="kz-form-sec-title">{isRtl ? '01 / بيانات العميل' : '01 / Personal Details'}</h4>
                <div className="kz-form-grid-2">
                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'الاسم الكامل' : 'Full Name'}</label>
                    <input
                      type="text"
                      className="kz-input"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'رقم الجوال (واتساب)' : 'Mobile Phone (WhatsApp)'}</label>
                    <input
                      type="tel"
                      className="kz-input"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="kz-field-wrap" style={{ gridColumn: 'span 2' }}>
                    <label className="kz-field-label">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input
                      type="email"
                      className="kz-input"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="kz-form-section" style={{ marginTop: '24px' }}>
                <h4 className="kz-form-sec-title">{isRtl ? '02 / عنوان التوصيل الرئيسي (قطر والخليج)' : '02 / Primary Shipping Destination'}</h4>
                <div className="kz-form-grid-2">
                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'الدولة' : 'Country'}</label>
                    <select
                      className="kz-input"
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                    >
                      <option value="Qatar">Qatar (قطر)</option>
                      <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                      <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                      <option value="Kuwait">Kuwait (الكويت)</option>
                      <option value="Bahrain">Bahrain (البحرين)</option>
                      <option value="Oman">Oman (سلطنة عمان)</option>
                    </select>
                  </div>

                  <div className="kz-field-wrap">
                    <label className="kz-field-label">{isRtl ? 'المدينة / المنطقة' : 'City / District'}</label>
                    <input
                      type="text"
                      className="kz-input"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      required
                    />
                  </div>

                  <div className="kz-field-wrap" style={{ gridColumn: 'span 2' }}>
                    <label className="kz-field-label">{isRtl ? 'تفاصيل العنوان / الشارع / رقم الفيلا' : 'Street Address / Zone / Villa No.'}</label>
                    <input
                      type="text"
                      className="kz-input"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="submit" className="kz-btn kz-btn-primary kz-btn-island">
                  <span>{isRtl ? 'حفظ التعديلات' : 'Save Changes'}</span>
                  <span className="kz-btn-island-icon">
                    <Save size={13} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
