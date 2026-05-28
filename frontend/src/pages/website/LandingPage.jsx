import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import abhiImg from '../../images/DrAbhi.jpeg';
import atulImg from '../../images/DrAtul.jpeg'; 
import mehakImg from '../../images/DrMehak.jpeg'; 
import asthaBgremove from '../../images/DrAstha-removebg-preview.png';
import atulBgremove from '../../images/DrAtul-removebg-preview.png';
import mehakBgremove from '../../images/DrMehak-removebg-preview.png';
import asthaImg from '../../images/DrAstha.jpeg';
import hair_loss from "../../images/hair_loss.png";
import knee_pain from  "../../images/knee_pain.png";
import skin_issue from "../../images/skin_issue.png";
import women_health from "../../images/women_health.png";
import logo from "../../images/Favicon_up.png";

const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userStr = localStorage.getItem('user');

  let parsedRole = role;
  let loggedIn = !!token || !!role || !!userStr;

  if (userStr) {
    try {
      const userObj = JSON.parse(userStr);
      if (userObj && userObj.role) parsedRole = userObj.role;
    } catch (e) {
      console.error("Failed to parse user from local storage");
    }
  }

  return { loggedIn, role: parsedRole || 'patient' };
};

const LandingPage = ({ isLoggedIn: propIsLoggedIn, userRole: propUserRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromStickyLogo = location.state?.fromStickyLogo; 

  const [isLoggedIn, setIsLoggedIn] = useState(() => propIsLoggedIn || checkAuthStatus().loggedIn);
  const [userRole, setUserRole] = useState(() => propUserRole || checkAuthStatus().role);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateAuth = () => {
      const { loggedIn, role } = checkAuthStatus();
      setIsLoggedIn(loggedIn);
      setUserRole(role);
    };

    updateAuth(); 

    window.addEventListener('storage', updateAuth);
    window.addEventListener('focus', updateAuth);

    return () => {
      window.removeEventListener('storage', updateAuth);
      window.removeEventListener('focus', updateAuth);
    };
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/', { replace: true }); 
  };

  const handleDashboardClick = () => {
    if (userRole === 'admin') navigate('/admin/dashboard');
    else if (userRole === 'doctor') navigate('/doctor/dashboard');
    else navigate('/patient/dashboard');
  };

  const handleMenuAction = () => {
    if (fromStickyLogo) {
      localStorage.setItem('token', 'bypass-token');
      localStorage.setItem('role', 'patient');
      localStorage.setItem('user', JSON.stringify({ role: 'patient', name: 'Bypass User' }));
      setIsLoggedIn(true);
      setUserRole('patient');
      navigate('/patient/dashboard');
      return;
    }

    if (isLoggedIn) {
      if (userRole === 'admin') navigate('/admin/dashboard');
      else if (userRole === 'doctor') navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <style>{`
        :root{
          --cream:#FBF4E8;--cream2:#F3EADB;--gd:#1A3C2A;--gm:#2D6B45;--gl:#E8F0E8;--gp:#F0F7F0;
          --gold:#C4A35A;--goldL:#D4B56A;--td:#1A1A1A;--tm:#4A4A4A;--tl:#6B6B6B;--w:#FFF;
          --wa:#25D366;--coral:#E8613A;--coral-light:#FDEEE9;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--td);line-height:1.6;overflow-x:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact}
        
        .header{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:var(--w);border-bottom:1px solid #E8E0D0;position:sticky;top:0;z-index:100}
        .header-left{display:flex;align-items:center;gap:10px}
        .logo-c{width:34px;height:34px;background:var(--gd);border-radius:50%;display:flex;align-items:center;justify-content:center}
        .logo-c svg{width:20px;height:20px}
        .brand{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:var(--gd)}
        .nav-d{display:none}
        .nav-d a, .nav-d span{cursor:pointer;text-decoration:none;color:var(--tm);font-size:13px;font-weight:500}
        .btn-wa-header{display:inline-flex;align-items:center;gap:6px;background:var(--wa);color:var(--w);padding:8px 16px;border-radius:24px;font-size:12px;font-weight:700;text-decoration:none}
        .btn-wa-header svg{width:16px;height:16px;fill:var(--w)}
        .hamburger{display:flex;flex-direction:column;gap:4px;cursor:pointer;padding:4px}
        .hamburger span{display:block;width:20px;height:2px;background:var(--gd);border-radius:1px}

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--w);
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 16px;
          border-bottom: 1px solid #E8E0D0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          z-index: 99;
        }
        .mobile-menu a, .mobile-menu span {
          text-decoration: none;
          color: var(--tm);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .hero{background:linear-gradient(160deg,#1A3C2A 0%,#234B35 40%,#2D6B45 100%);padding:28px 20px 0;position:relative;overflow:hidden}
        .hero-text{position:relative;z-index:2}
        .hero-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.1);border:1px solid rgba(196,163,90,.4);padding:5px 14px;border-radius:20px;margin-bottom:16px}
        .hero-pill span{font-size:12px;font-weight:600;color:var(--goldL)}
        .hero h1{font-family:'Playfair Display',serif;font-size:30px;font-weight:800;line-height:1.18;color:var(--w);margin-bottom:10px}
        .hero h1 .highlight{color:var(--goldL)}
        .hero-desc{font-size:14px;color:rgba(255,255,255,.8);line-height:1.6;margin-bottom:20px;max-width:500px}
        .hero-desc strong{color:var(--w)}
        .btn-wa-hero{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--coral);color:var(--w);padding:16px 24px;border-radius:14px;font-size:16px;font-weight:800;text-decoration:none;width:100%;box-shadow:0 6px 24px rgba(232,97,58,.4)}
        .btn-wa-hero svg{width:22px;height:22px;fill:var(--w)}
        .hero-note{font-size:11px;color:rgba(255,255,255,.55);margin-top:8px;display:flex;align-items:center;gap:4px}
        .hero-note::before{content:'✓';color:var(--wa);font-weight:700}

        .hero-doctors{position:relative;margin-top:30px;display:flex;justify-content:center;align-items:flex-end;min-height:280px}
        .hero-circle{position:absolute;top:20px;right:-10px;width:300px;height:300px;border-radius:50%;background:var(--w);opacity:0.12;z-index:0}
        .doctor-img-area{position:relative;z-index:1;display:flex;align-items:flex-end;justify-content:center;gap:0;margin:0}
        .doctor-placeholder{display:flex;flex-direction:column;align-items:center}
        
        .doctor-avatar{background:transparent;border:none;display:flex;align-items:flex-end;justify-content:center}
        .doctor-avatar img{width:160px; max-width:none !important; height:auto; object-fit:contain; object-position:bottom center; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.3));}
        
        .doctor-placeholder:nth-child(2) .doctor-avatar{z-index:3;position:relative}
        .doctor-placeholder:nth-child(2) .doctor-avatar img{width:220px; z-index:3;}
        .doctor-placeholder:nth-child(1){transform:translateX(60px);z-index:2}
        .doctor-placeholder:nth-child(3){transform:translateX(-60px);z-index:1}

        /* --- HERO BADGES - STRICTLY NO SCROLL, SINGLE ROW --- */
        .float-badges {
          position: relative;
          z-index: 4;
          display: flex;
          flex-wrap: nowrap; /* Forces badges to stay on one line */
          gap: 4px; /* Tightened gap */
          justify-content: center;
          margin-top: -10px;
          padding: 0 6px 20px;
          width: 100%;
        }
        .float-badge {
          flex: 1 1 0; /* Forces them to shrink evenly and perfectly fit the screen */
          min-width: 0; /* Required to allow them to shrink below content size */
          background: var(--w);
          border-radius: 10px;
          padding: 6px 2px; /* Very tight padding to maximize text space */
          display: flex;
          flex-direction: column; /* Stack icon on top of text */
          align-items: center;
          text-align: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(0,0,0,.15);
          border: 1px solid #F0EBE0;
        }
        .float-badge .badge-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--gp);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }
        .float-badge strong {
          font-size: 9px;
          color: var(--gd);
          display: block;
          line-height: 1.2;
          white-space: normal;
        }
        .float-badge span {
          font-size: 8px;
          color: var(--tl);
          display: block;
          white-space: normal;
          line-height: 1.2;
        }

        .schedule-bar{background:linear-gradient(135deg,var(--gd),var(--gm));padding:14px 20px;display:flex;align-items:center;justify-content:center;gap:8px}
        .schedule-bar p{font-size:14px;font-weight:700;color:var(--w)}
        .schedule-bar svg{width:18px;height:18px;fill:var(--w)}

        .sec{padding:40px 20px}
        
        /* --- GAP FIX: Remove bottom padding of conditions sec --- */
        .conditions-sec{background:var(--cream);padding:36px 20px 0;}
        /* Pulls the "How it Works" section up tighter to the button */
        .conditions-sec + .sec { padding-top: 24px; }
        
        .sec-title{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--gd);text-align:center;margin-bottom:6px;line-height:1.25}
        .sec-sub{text-align:center;font-size:13px;color:var(--tl);margin-bottom:28px;line-height:1.5}

        .cond-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
        .cond-card{display:block;border-radius:14px;overflow:hidden;position:relative;text-decoration:none;aspect-ratio:3/4;border:1px solid #E0D8C8; background:#1A3C2A}
        .cond-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s; opacity: 0.8}
        .cond-card:active .cond-img{transform:scale(1.05)}
        .cond-overlay{position:absolute;bottom:0;left:0;right:0;padding:14px;background:linear-gradient(0deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.45) 60%,transparent 100%)}
        .cond-overlay h3{font-family:'Playfair Display',serif;font-size:17px;color:var(--w);margin-bottom:3px}
        .cond-overlay p{font-size:10px;color:rgba(255,255,255,.75);line-height:1.4;margin-bottom:8px}
        .cond-cta{display:inline-flex;align-items:center;gap:4px;background:var(--wa);color:var(--w);padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700}
        
        /* GAP FIX: Set margin-bottom to 0 so it aligns cleanly to the bottom */
        .cond-other{display:flex;align-items:center;gap:12px;padding:16px 18px;background:var(--w);border:1.5px solid #D8D0C0;border-radius:14px;text-decoration:none;color:var(--gd);margin-bottom:0;}
        .cond-other .emoji{font-size:28px;flex-shrink:0}
        .cond-other strong{font-size:15px;display:block;margin-bottom:2px;color:var(--gd)}
        .cond-other span{font-size:11px;color:var(--tl);line-height:1.4}
        .cond-other .arrow{font-size:20px;color:var(--wa);font-weight:700;margin-left:auto;flex-shrink:0}

        .steps{display:flex;flex-direction:column;gap:14px}
        .step{display:flex;gap:14px;align-items:flex-start;padding:16px;background:var(--w);border-radius:14px;border:1px solid #E8E0D0}
        .step-num{width:38px;height:38px;min-width:38px;background:var(--wa);color:var(--w);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px}
        .step h3{font-family:'Playfair Display',serif;font-size:16px;color:var(--gd);margin-bottom:3px}
        .step p{font-size:13px;color:var(--tm);line-height:1.5}

        .doctors-sec{background:var(--w)}
        .doc-scroll, .test-scroll {
          display:flex !important; 
          flex-wrap: nowrap !important;
          gap:14px;
          overflow-x:auto !important;
          -webkit-overflow-scrolling:touch;
          scroll-snap-type:x mandatory;
          padding-bottom:16px;
        }
        .doc-scroll::-webkit-scrollbar, .test-scroll::-webkit-scrollbar {
          display:none;
        }
        
        .doc-card, .test-card {
          flex-shrink: 0 !important;
          scroll-snap-align: start;
        }

        .doc-card {
          width: 260px;
          background:var(--cream);
          border-radius:14px;
          overflow:hidden;
          text-align:center;
          border:1px solid #E8E0D0;
        }
        
        .doc-photo {
          height: 250px;
          background: var(--w); 
          display: flex;
          align-items: flex-end; 
          justify-content: center;
          overflow: hidden;
        }
        .doc-photo img {
          width: 100%;
          height: 100%;
          object-fit: contain; 
          object-position: bottom center; 
        }
        
        .doc-info{padding:14px}
        .doc-info h3{font-family:'Playfair Display',serif;font-size:16px;color:var(--gd);margin-bottom:2px}
        .doc-info .cred{font-size:11px;color:var(--gold);font-weight:600}
        .doc-info .spec{font-size:10px;color:var(--tl);text-transform:uppercase;letter-spacing:.5px;margin:3px 0}
        .doc-info .exp{font-size:11px;color:var(--tm);margin-bottom:10px}
        .btn-wa-doc{display:inline-flex;align-items:center;gap:5px;background:var(--wa);color:var(--w);padding:8px 18px;border-radius:20px;font-size:12px;font-weight:700;text-decoration:none}
        .btn-wa-doc svg{width:14px;height:14px;fill:var(--w)}

        .test-sec{background:var(--gp)}
        .test-card{
          width: 300px;
          background:var(--w);
          border-radius:14px;
          padding:22px 18px;
        }
        .test-stars{color:var(--gold);font-size:15px;margin-bottom:10px;letter-spacing:2px}
        .test-card blockquote{font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:var(--tm);line-height:1.6;margin-bottom:14px}
        .test-author{display:flex;align-items:center;gap:10px}
        .test-avatar{width:36px;height:36px;border-radius:50%;background:var(--gp);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--gm);font-size:14px}
        .test-name{font-weight:600;font-size:12px;color:var(--gd)}
        .test-cond{font-size:10px;color:var(--tl)}
        .test-badge{text-align:center;font-size:12px;color:var(--tm)}
        .test-badge strong{color:var(--gd);font-size:14px}

        .final-cta{background:var(--gd);padding:44px 20px;text-align:center;position:relative;overflow:hidden}
        .final-cta::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(45,107,69,.4),transparent 60%)}
        .final-cta h2{font-family:'Playfair Display',serif;font-size:26px;color:var(--w);font-weight:700;position:relative;line-height:1.25;margin-bottom:6px}
        .final-cta .sub{font-family:'Playfair Display',serif;font-style:italic;font-size:18px;color:var(--goldL);position:relative;margin-bottom:14px}
        .final-cta .desc{font-size:13px;color:rgba(255,255,255,.75);position:relative;margin-bottom:24px;line-height:1.5}
        .btn-wa-final{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--wa);color:var(--w);padding:18px 24px;border-radius:16px;font-size:17px;font-weight:800;text-decoration:none;width:100%;max-width:400px;margin:0 auto 10px;box-shadow:0 6px 28px rgba(37,211,102,.35);position:relative}
        .btn-wa-final svg{width:24px;height:24px;fill:var(--w)}
        .cta-note{font-size:11px;color:rgba(255,255,255,.45);position:relative;margin-bottom:20px}
        .cta-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 18px;position:relative;margin-bottom:28px}
        .cta-trust span{color:rgba(255,255,255,.6);font-size:11px}
        .mini-faq{position:relative;text-align:left;max-width:500px;margin:0 auto}
        .mini-faq h3{font-family:'Playfair Display',serif;font-size:16px;color:var(--w);margin-bottom:14px;text-align:center}
        .faq-q{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:14px 16px;margin-bottom:8px}
        .faq-q strong{font-size:13px;color:var(--w);display:block;margin-bottom:4px}
        .faq-q p{font-size:12px;color:rgba(255,255,255,.6);line-height:1.5}

        .footer{background:var(--cream2);padding:32px 20px 20px;text-align:center}
        .footer-brand{font-family:'Playfair Display',serif;font-size:18px;color:var(--gd);font-weight:700;margin-bottom:6px}
        .footer-tag{font-family:'Playfair Display',serif;font-style:italic;font-size:13px;color:var(--gold);margin-bottom:14px}
        .footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 16px;margin-bottom:14px}
        .footer-links a{font-size:12px;color:var(--tm);text-decoration:none}
        .footer-social{display:flex;justify-content:center;gap:10px;margin-bottom:14px}
        .footer-social a{width:36px;height:36px;border-radius:50%;background:var(--gd);display:flex;align-items:center;justify-content:center;color:var(--w);font-size:11px;font-weight:700;text-decoration:none;transition:background 0.3s;}
        .footer-social a:hover{background:var(--wa);}

        .footer-copy{font-size:11px;color:var(--tl)}

        @media(min-width:1024px){
          .header{padding:14px 60px}
          .brand{font-size:20px}
          .hamburger{display:none}
          .mobile-menu{display:none}
          .nav-d{display:flex;gap:28px;align-items:center}
          .btn-wa-header{padding:10px 22px;font-size:13px}

          .hero{padding:48px 60px 0;display:flex;gap:0;align-items:flex-start;min-height:550px}
          .hero-text{max-width:520px;padding-top:40px;flex-shrink:0}
          .hero h1{font-size:44px}
          .hero-desc{font-size:16px}
          .btn-wa-hero{width:fit-content;padding:18px 40px;font-size:17px}
          
          .hero-doctors{position:absolute;right:0;bottom:0;width:55%;margin-top:0;min-height:unset}
          .hero-circle{width:650px;height:650px;right:-50px;top:40%;transform:translateY(-50%);background:var(--w);opacity:0.12}
          
          .doctor-avatar img{width:240px}
          .doctor-placeholder:nth-child(2) .doctor-avatar img{width:320px}
          .doctor-placeholder:nth-child(1){transform:translateX(100px)}
          .doctor-placeholder:nth-child(3){transform:translateX(-100px)}
          
          /* Badges restore horizontal layout for desktop */
          .float-badges{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);width:100%;max-width:900px;justify-content:center;padding:0;z-index:10;gap:16px;overflow:visible;}
          .float-badge{flex:unset; flex-direction:row; padding:14px 24px; border-radius:16px;}
          .float-badge .badge-icon{width:40px;height:40px;font-size:18px;}
          .float-badge strong{font-size:14px; white-space:nowrap;}
          .float-badge span{font-size:12px; white-space:nowrap;}

          .schedule-bar{padding:16px 60px}
          .schedule-bar p{font-size:16px}

          /* GAP FIX FOR DESKTOP */
          .conditions-sec { padding-bottom: 16px; }
          .conditions-sec + .sec { padding-top: 32px; }
          .cond-other{max-width:500px;margin:0 auto 0;}
          
          .sec{padding:56px 60px}
          .sec-title{font-size:32px}
          .sec-sub{font-size:15px;margin-bottom:36px}
          .cond-cards{grid-template-columns:repeat(4,1fr);gap:16px;max-width:1000px;margin:0 auto 16px}
          .cond-card{aspect-ratio:3/5}
          .cond-overlay h3{font-size:20px}
          .cond-overlay p{font-size:11px}
          .steps{flex-direction:row;gap:20px;max-width:900px;margin:0 auto}
          .step{flex:1;flex-direction:column;text-align:center;padding:24px 20px}
          .step-num{margin:0 auto 12px}
          
          .doc-scroll { 
            display: grid !important; 
            grid-template-columns: repeat(4, 1fr) !important; 
            gap: 24px !important;
            overflow: visible !important; 
          }
          .doc-card { width: 100% !important; } 

          .test-scroll { 
            display: grid !important; 
            grid-template-columns: repeat(3, 1fr) !important; 
            gap: 24px !important;
            overflow: visible !important; 
          }
          .test-card { width: 100% !important; } 

          .final-cta{padding:64px 60px}
          .final-cta h2{font-size:38px}
          .btn-wa-final{width:auto;display:inline-flex;padding:20px 48px;font-size:18px}
          .mini-faq{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;max-width:900px}
          .mini-faq h3{grid-column:1/-1}
        }
        @media(min-width:768px) and (max-width:1023px){
          .header{padding:14px 32px}
          .hero{padding:36px 32px 0}
          .hero h1{font-size:36px}
          .sec{padding:44px 32px}
          .steps{flex-direction:row;gap:14px}
          .step{flex:1;flex-direction:column;text-align:center}
          .step-num{margin:0 auto 10px}
        }
      `}</style>
      
      <header className="header">
        <div className="header-left">
          <div className="logo-c">
            <img src={logo} alt="logo" className="rounded-full" />
          </div>
          <span className="brand">AyurCare 360</span>
        </div>
        <nav className="nav-d">
          <a href="#conditions">Conditions</a>
          <a href="#doctors">Our Doctors</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          {isLoggedIn || fromStickyLogo ? (
             <>
               <span onClick={handleMenuAction}>Dashboard</span>
               <span onClick={handleLogout}>Logout</span>
             </>
          ) : (
             <span onClick={handleMenuAction}>Login</span>
          )}
        </nav>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20to%20consult%20an%20Ayurvedic%20doctor" className="btn-wa-header">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat with Doctor
          </a>
          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#conditions" onClick={() => setIsMobileMenuOpen(false)}>Conditions</a>
            <a href="#doctors" onClick={() => setIsMobileMenuOpen(false)}>Our Doctors</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            {isLoggedIn || fromStickyLogo ? (
               <>
                 <span onClick={() => { setIsMobileMenuOpen(false); handleMenuAction(); }}>Dashboard</span>
                 <span onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}>Logout</span>
               </>
            ) : (
               <span onClick={() => { setIsMobileMenuOpen(false); handleMenuAction(); }}>Login</span>
            )}
          </div>
        )}
      </header>

      <section className="hero">
        <div className="hero-text">
          <div className="hero-pill"><span>🍃</span><span>Free Ayurvedic Consultation</span></div>
          <h1>Online <span className="highlight">Ayurvedic</span> Consultation</h1>
          <p className="hero-desc">Get <strong>free expert consultation</strong> from experienced BAMS-certified Ayurvedic doctors. Personalized diet, herbal guidance, and lifestyle plans. All on WhatsApp.</p>
          <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20a%20free%20Ayurvedic%20consultation" className="btn-wa-hero">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Start Your Free Consultation
          </a>
          <p className="hero-note">Verified Doctors · Respond within 30 minutes</p>
        </div>

        <div className="hero-doctors">
          <div className="hero-circle"></div>
          <div className="doctor-img-area">
            <div className="doctor-placeholder"><div className="doctor-avatar"><img src={asthaBgremove} alt="Doc 1" /></div></div>
            <div className="doctor-placeholder"><div className="doctor-avatar"><img src={atulBgremove} alt="Doc 2" /></div></div>
            <div className="doctor-placeholder"><div className="doctor-avatar"><img src={mehakBgremove} alt="Doc 3" /></div></div>
          </div>
        </div>

        <div className="float-badges">
          <div className="float-badge"><div className="badge-icon">⏱️</div><div><strong>Avg Response: 30 min</strong><span>Across all doctors</span></div></div>
          <div className="float-badge"><div className="badge-icon">⭐</div><div><strong>4.8 / 5 Rating</strong><span>1000+ consultations</span></div></div>
          <div className="float-badge"><div className="badge-icon">🩺</div><div><strong>BAMS Certified</strong><span>Verified Ayurvedic doctors</span></div></div>
        </div>
      </section>

      <div className="schedule-bar">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <p>Chat with your Ayurvedic Doctor on WhatsApp Now</p>
      </div>

      <section className="sec conditions-sec" id="conditions">
        <h2 className="sec-title">What are you experiencing?</h2>
        <p className="sec-sub">Tap your concern to chat with a doctor on WhatsApp.</p>
        <div className="cond-cards">
          <a href="https://wa.me/919452464680?text=Hi%20Doctor%2C%20I%27m%20experiencing%20*skin%20issues*%20such%20as%20acne%2C%20psoriasis%2C%20eczema%2C%20or%20inflammation.%20I%27d%20like%20a%20free%20Ayurvedic%20consultation.%20Please%20help." className="cond-card">
            <img src={skin_issue} alt="Skin Issues" className="cond-img" />
            <div className="cond-overlay">
              <h3>Skin Issues</h3>
              <p>Acne, Psoriasis, Eczema, Rashes, Pigmentation, Inflammation</p>
              <span className="cond-cta">Chat with Doctor &#8594;</span>
            </div>
          </a>
          
          <a href="https://wa.me/919452464680?text=Hi%20Doctor%2C%20I%27m%20experiencing%20*hair%20loss%20%2F%20hair%20thinning*.%20I%27d%20like%20a%20free%20Ayurvedic%20consultation%20for%20hair%20fall%2C%20dandruff%2C%20or%20premature%20greying.%20Please%20help." className="cond-card">
            <img src={hair_loss} alt="Hair Loss" className="cond-img" />
            <div className="cond-overlay">
              <h3>Hair Loss</h3>
              <p>Hair Fall, Thinning, Premature Greying, Dandruff, Scalp Issues</p>
              <span className="cond-cta">Chat with Doctor &#8594;</span>
            </div>
          </a>
          
          <a href="https://wa.me/919452464680?text=Hi%20Doctor%2C%20I%27m%20experiencing%20*joint%20%2F%20bone%20pain*%20such%20as%20knee%20pain%2C%20arthritis%2C%20back%20pain%2C%20or%20stiffness.%20I%27d%20like%20a%20free%20Ayurvedic%20consultation.%20Please%20help." className="cond-card">
            <img src={knee_pain} alt="Joint Pain" className="cond-img" />
            <div className="cond-overlay">
              <h3>Joint Pain</h3>
              <p>Knee Pain, Arthritis, Back Pain, Stiffness, Inflammation</p>
              <span className="cond-cta">Chat with Doctor &#8594;</span>
            </div>
          </a>
          
          <a href="https://wa.me/919452464680?text=Hi%20Doctor%2C%20I%20need%20help%20with%20*women%27s%20health*%20concerns%20such%20as%20PCOD%2FPCOS%2C%20irregular%20periods%2C%20weight%20gain%2C%20hormonal%20imbalance%2C%20or%20fertility.%20I%27d%20like%20a%20free%20Ayurvedic%20consultation.%20Please%20help." className="cond-card">
            <img src={women_health} alt="Women's Health" className="cond-img" />
            <div className="cond-overlay">
              <h3>Women's Health</h3>
              <p>PCOD/PCOS, Weight Gain, Irregular Periods, Hormonal Imbalance, Fertility</p>
              <span className="cond-cta">Chat with Doctor &#8594;</span>
            </div>
          </a>
        </div>
        
        <a href="https://wa.me/919452464680?text=Hi%20Doctor%2C%20I%20have%20a%20health%20concern%20I%27d%20like%20to%20discuss.%20It%27s%20related%20to%20%5Bimmunity%20%2F%20digestion%20%2F%20anxiety%20%2F%20other%5D.%20I%27d%20like%20a%20free%20Ayurvedic%20consultation." className="cond-other">
          <div className="emoji">🌿</div>
          <div>
            <strong>Something Else?</strong>
            <span>Immunity, Digestion, Sleep, Anxiety, Diabetes, Thyroid & more</span>
          </div>
          <div className="arrow">&#8594;</div>
        </a>
      </section>

      <section className="sec">
        <h2 className="sec-title">How It Works</h2>
        <p className="sec-sub">Three steps. All on WhatsApp. All free.</p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <div>
              <h3>Start a Chat</h3>
              <p>Tap the WhatsApp button. Say hi or tell us what's bothering you.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div>
              <h3>Talk to a Real Doctor</h3>
              <p>A BAMS-certified physician replies within 30 minutes.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div>
              <h3>Get Your Plan</h3>
              <p>Personalized diet chart, herbal guidance, and daily routine on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec doctors-sec" id="doctors">
        <h2 className="sec-title">Meet Your Doctors</h2>
        <p className="sec-sub">Real doctors. Real conversations. Not chatbots.</p>
        <div className="doc-scroll">

          <div className="doc-card">
            <div className="doc-photo"><img src={atulImg} alt="Dr. Atul Pandey" /></div>
            <div className="doc-info">
              <h3>Dr. Atul Pandey</h3>
              <p className="cred">BAMS, MD</p>
              <p className="spec">DIABETES, OBESITY & WEIGHT MANAGEMENT</p>
              <p className="exp">3+ years · Hindi, English, Punjabi</p>
              <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20to%20consult%20Dr.%20Atul" className="btn-wa-doc">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat With Me
              </a>
            </div>
          </div>
          
          <div className="doc-card">
            <div className="doc-photo"><img src={asthaImg} alt="Dr. Astha Srivastava" /></div>
            <div className="doc-info">
              <h3>Dr. Astha Srivastava</h3>
              <p className="cred">BAMS, DRCH</p>
              <p className="spec">GYNECOLOGY & OBSTETRICS</p>
              <p className="exp">4+ years · Hindi, English</p>
              <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20to%20consult%20Dr.%20Astha" className="btn-wa-doc">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat With Me
              </a>
            </div>
          </div>
          
          <div className="doc-card">
            <div className="doc-photo"><img src={abhiImg} alt="Dr. Abhishek Sharma" /></div>
            <div className="doc-info">
              <h3>Dr. Abhishek Sharma</h3>
              <p className="cred">BAMS</p>
              <p className="spec">PANCHAKARMA & PAIN MANAGEMENT</p>
              <p className="exp">3+ years · Hindi, English</p>
              <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20to%20consult%20Dr.%20Abhishek" className="btn-wa-doc">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat With Me
              </a>
            </div>
          </div>

          <div className="doc-card">
            <div className="doc-photo"><img src={mehakImg} alt="Dr. Mehak" /></div>
            <div className="doc-info">
              <h3>Dr. Mehak</h3>
              <p className="cred">BAMS, MD</p>
              <p className="spec">LIVER AND KIDNEY DISORDERS</p>
              <p className="exp">5+ years · Hindi, English, Punjabi</p>
              <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20to%20consult%20Dr.%20Mehak" className="btn-wa-doc">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat With Me
              </a>
            </div>
          </div>
          
        </div>
      </section>

      <section className="sec test-sec" id="reviews">
        <h2 className="sec-title">Real Patients. Real Results.</h2>
        <p className="sec-sub">From people who chose a different path to healing.</p>
        <div className="test-scroll">
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <blockquote>"3 months with AyurCare 360 and my chronic acne cleared completely. Dr. Astha understood my body like no one before."</blockquote>
            <div className="test-author">
              <div className="test-avatar">P</div>
              <div>
                <p className="test-name">Priya M.</p>
                <p className="test-cond">Chronic Acne · Delhi</p>
              </div>
            </div>
          </div>
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <blockquote>"Was skeptical about Ayurveda for anxiety. The personalized routine made a real difference within weeks. Sleeping better than I have in years."</blockquote>
            <div className="test-author">
              <div className="test-avatar">R</div>
              <div>
                <p className="test-name">Rahul K.</p>
                <p className="test-cond">Sleep & Anxiety · Mumbai</p>
              </div>
            </div>
          </div>
          <div className="test-card">
            <div className="test-stars">★★★★★</div>
            <blockquote>"The diet plan was so practical. Not a single ingredient I couldn't find locally. Bloating and reflux are finally under control."</blockquote>
            <div className="test-author">
              <div className="test-avatar">A</div>
              <div>
                <p className="test-name">Ananya S.</p>
                <p className="test-cond">Digestive Health · Bangalore</p>
              </div>
            </div>
          </div>
        </div>
        <p className="test-badge"><strong>4.8/5</strong> from <strong>500+</strong> verified reviews</p>
      </section>

      <section className="final-cta" id="faq">
        <h2>Start with one message.</h2>
        <p className="sub">It might change everything.</p>
        <p className="desc">Talk to a real Ayurvedic doctor on WhatsApp. Not a chatbot. Not a form.</p>
        <a href="https://wa.me/919452464680?text=Hi%2C%20I%27d%20like%20a%20free%20Ayurvedic%20consultation" className="btn-wa-final">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat with a Doctor — FREE
        </a>
        <p className="cta-note">100% Free · Replies within 30 min · No app needed</p>
        <div className="cta-trust"><span>🔒 Confidential</span><span>🛡️ BAMS Certified</span><span>💬 Real Doctors</span></div>
        <div className="mini-faq">
          <h3>Quick Answers</h3>
          <div className="faq-q"><strong>Is it really free?</strong><p>Yes. Your first consultation on WhatsApp is completely free. No card, no catch.</p></div>
          <div className="faq-q"><strong>Who will reply?</strong><p>A real BAMS-certified Ayurvedic doctor. Not a bot, not an assistant.</p></div>
          <div className="faq-q"><strong>How fast is the reply?</strong><p>Most patients hear back within 30 minutes during 9 AM - 9 PM IST.</p></div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">AyurCare 360</div>
        <div className="footer-tag">Built by doctors. Guided by tradition. Led by honesty.</div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <a href="#doctors" onClick={() => setIsMobileMenuOpen(false)}>Doctors</a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-social">
          <a href="http://facebook.com/61577539592430/" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/ayurcare.360?igsh=Nm45MTBrbnk3ZG9z" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
        <p className="footer-copy">© 2026 AyurCare 360. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;