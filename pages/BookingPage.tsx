import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  X, Calendar, Users, Home, Clock, Eye, 
  Wifi, Coffee, Car, Flower, Plane, 
  Check, ArrowRight, ArrowLeft, AlertCircle,
  Shield, Tv
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { useI18n } from '@/lib/i18n';
import { allRooms, Room } from '@/lib/rooms-data';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BookingData {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  adults: number;
  children: number;
  selectedRoom: Room | null;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
  upsells: string[];
}

const STEPS = {
  DATES_GUESTS: 1,
  ROOM_SELECTION: 2,
  CONTACT_CONFIRM: 3
};

export default function BookingPage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.DATES_GUESTS);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: new Date(),
    checkOut: addDays(new Date(), 2),
    adults: 2,
    children: 0,
    selectedRoom: null,
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
    upsells: []
  });
  
  // Urgent state
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [viewers, setViewers] = useState(3);
  const [availableRooms, setAvailableRooms] = useState(2);

  // Timer effect
  useEffect(() => {
    if (step === STEPS.ROOM_SELECTION && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStep(STEPS.DATES_GUESTS);
            return 600;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // Simulate viewers count
  useEffect(() => {
    if (step === STEPS.ROOM_SELECTION) {
      const interval = setInterval(() => {
        setViewers(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => {
    if (step === STEPS.DATES_GUESTS) {
      if (!bookingData.checkIn || !bookingData.checkOut || bookingData.checkOut <= bookingData.checkIn) {
        return;
      }
      setStep(STEPS.ROOM_SELECTION);
    } else if (step === STEPS.ROOM_SELECTION) {
      if (!bookingData.selectedRoom) return;
      setStep(STEPS.CONTACT_CONFIRM);
    }
  };

  const handleBack = () => {
    if (step > STEPS.DATES_GUESTS) {
      setStep(prev => prev - 1);
    }
  };

  const handleRoomSelect = (room: Room) => {
    setBookingData(prev => ({ ...prev, selectedRoom: room }));
  };

  const toggleUpsell = (service: string) => {
    setBookingData(prev => ({
      ...prev,
      upsells: prev.upsells.includes(service)
        ? prev.upsells.filter(s => s !== service)
        : [...prev.upsells, service]
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAvailableRooms = () => {
    const totalGuests = bookingData.adults + bookingData.children;
    return allRooms.filter(r => r.guests >= totalGuests);
  };

  const calculateTotalPrice = () => {
    if (!bookingData.selectedRoom || !bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const nights = Math.ceil(
      (bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    let total = bookingData.selectedRoom.price * nights;
    
    bookingData.upsells.forEach(service => {
      if (service === 'airport') total += 10;
      if (service === 'flowers') total += 15;
      if (service === 'car') total += 25;
    });
    
    return total;
  };

  const handleSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    alert('Bron muvaffaqiyatli yaratildi!');
    window.close(); // Close the popup window
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl pt-24">
        {/* Step 1: Dates & Guests */}
        {step === STEPS.DATES_GUESTS && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Sana va Mehmonlar</h2>
              <p className="text-muted-foreground">Kelish va ketish sanasini tanlang</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium mb-2">Kelish sanasi</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {bookingData.checkIn ? format(bookingData.checkIn, 'PPP') : 'Sanani tanlang'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={bookingData.checkIn}
                      onSelect={(date) => setBookingData(prev => ({ ...prev, checkIn: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium mb-2">Ketish sanasi</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                      disabled={!bookingData.checkIn}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {bookingData.checkOut ? format(bookingData.checkOut, 'PPP') : 'Sanani tanlang'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={bookingData.checkOut}
                      onSelect={(date) => setBookingData(prev => ({ ...prev, checkOut: date }))}
                      disabled={(date) => 
                        bookingData.checkIn ? date <= bookingData.checkIn : true
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium mb-3">Mehmonlar soni</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Kattalar</label>
                  <select
                    value={bookingData.adults}
                    onChange={(e) => setBookingData(prev => ({ ...prev, adults: +e.target.value }))}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} kishi</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Bolalar</label>
                  <select
                    value={bookingData.children}
                    onChange={(e) => setBookingData(prev => ({ ...prev, children: +e.target.value }))}
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  >
                    {[0,1,2,3,4].map(n => (
                      <option key={n} value={n}>{n} kishi</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Room Selection */}
        {step === STEPS.ROOM_SELECTION && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Xona tanlang</h2>
                <p className="text-muted-foreground">
                  {getAvailableRooms().length} ta xona mavjud
                </p>
              </div>
              {/* Urgent indicators */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <AlertCircle size={16} />
                  <span>Oxirgi {availableRooms} ta xona!</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye size={16} />
                  <span>{viewers} kishi ko'ryapti</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Clock size={16} />
                  <span>{formatTime(timeLeft)} qoldi</span>
                </div>
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid gap-4">
              {getAvailableRooms().map((room) => (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.01 }}
                  className={`cursor-pointer rounded-2xl border-2 p-4 transition-all ${
                    bookingData.selectedRoom?.id === room.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="aspect-video lg:w-64 rounded-xl overflow-hidden">
                      <img 
                        src={room.img} 
                        alt={t(`rooms.${room.key}`)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-xl">{t(`rooms.${room.key}`)}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t(`rooms.${room.key}Desc`)}
                          </p>
                        </div>
                        {bookingData.selectedRoom?.id === room.id && (
                          <div className="p-2 bg-accent text-white rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                          <Users size={12} /> {room.guests} kishi
                        </span>
                        <span className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                          <Home size={12} /> {room.sqm} m²
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Wifi size={12} /> WiFi
                        </span>
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Coffee size={12} /> Nonushta
                        </span>
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Shield size={12} /> Konditsioner
                        </span>
                        <span className="flex items-center gap-1 text-xs text-accent">
                          <Tv size={12} /> TV
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-2xl font-bold text-accent">
                          ${room.price}
                          <span className="text-sm font-normal text-muted-foreground">/kecha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact & Confirm */}
        {step === STEPS.CONTACT_CONFIRM && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">Bronni tasdiqlash</h2>
              <p className="text-muted-foreground">Bog'lanish ma'lumotlaringizni kiriting</p>
            </div>

            {/* Selected Room Summary */}
            {bookingData.selectedRoom && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={bookingData.selectedRoom.img} 
                      alt="" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{t(`rooms.${bookingData.selectedRoom.key}`)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(bookingData.checkIn!, 'MMM d')} - {format(bookingData.checkOut!, 'MMM d')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">
                        ${calculateTotalPrice()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil(
                          (bookingData.checkOut!.getTime() - bookingData.checkIn!.getTime()) / (1000 * 60 * 60 * 24)
                        )} kecha
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ismingiz</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="Ismingizni kiriting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 rounded-lg border border-border bg-background"
                  placeholder="+998 XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email (ixtiyoriy)</label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 rounded-lg border border-border bg-background"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Maxsus talablaringiz</label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="w-full p-3 rounded-lg border border-border bg-background min-h-[100px]"
                placeholder="Qo'shimcha talablaringizni yozing..."
              />
            </div>

            {/* Upsell Services */}
            <div>
              <h3 className="font-semibold mb-3">Qo'shimcha xizmatlar</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { id: 'airport', icon: Plane, label: 'Aeroportga transfer', price: 10 },
                  { id: 'flowers', icon: Flower, label: 'Xonaga gullar', price: 15 },
                  { id: 'car', icon: Car, label: 'Avtomobill ijarasi', price: 25 }
                ].map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      bookingData.upsells.includes(service.id)
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => toggleUpsell(service.id)}
                  >
                    <service.icon size={20} className="text-accent mb-2" />
                    <div className="text-sm font-medium">{service.label}</div>
                    <div className="text-xs text-muted-foreground">+${service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Footer */}
        <div className="sticky bottom-0 glass p-4 border-t border-border/50 flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === STEPS.DATES_GUESTS}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Orqaga
          </Button>
          
          {step < STEPS.CONTACT_CONFIRM ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Keyingisi
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Check size={16} />
              Bronni tasdiqlash
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}