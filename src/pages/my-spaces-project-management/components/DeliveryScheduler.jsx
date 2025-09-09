import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeliveryScheduler = ({ deliveries, onScheduleDelivery, onRescheduleDelivery }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date()?.getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());

  const getDeliveryStatus = (status) => {
    switch (status) {
      case 'scheduled':
        return { color: 'text-accent bg-accent/10 border-accent/20', icon: 'Calendar' };
      case 'in-transit':
        return { color: 'text-warning bg-warning/10 border-warning/20', icon: 'Truck' };
      case 'delivered':
        return { color: 'text-success bg-success/10 border-success/20', icon: 'CheckCircle' };
      case 'delayed':
        return { color: 'text-error bg-error/10 border-error/20', icon: 'AlertTriangle' };
      default:
        return { color: 'text-muted-foreground bg-muted border-border', icon: 'Package' };
    }
  };

  const formatDeliveryDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1)?.getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const deliveriesOnDay = deliveries?.filter(delivery => {
        const deliveryDate = new Date(delivery.scheduledDate);
        return deliveryDate?.toDateString() === date?.toDateString();
      });

      days?.push({
        day,
        date,
        deliveries: deliveriesOnDay,
        isToday: date?.toDateString() === new Date()?.toDateString(),
        isPast: date < new Date()?.setHours(0, 0, 0, 0)
      });
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = generateCalendarDays();
  const upcomingDeliveries = deliveries?.filter(d => new Date(d.scheduledDate) >= new Date() && d?.status !== 'delivered')?.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))?.slice(0, 3);

  return (
    <div className="spatial-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-cta rounded-lg flex items-center justify-center">
            <Icon name="Truck" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Delivery Scheduler</h3>
            <p className="text-sm text-text-secondary">
              {upcomingDeliveries?.length} upcoming deliveries
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onScheduleDelivery()}
        >
          Schedule
        </Button>
      </div>
      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            iconName="ChevronLeft"
            onClick={() => {
              if (selectedMonth === 0) {
                setSelectedMonth(11);
                setSelectedYear(selectedYear - 1);
              } else {
                setSelectedMonth(selectedMonth - 1);
              }
            }}
          />
          <h4 className="font-semibold text-text-primary min-w-32 text-center">
            {monthNames?.[selectedMonth]} {selectedYear}
          </h4>
          <Button
            variant="ghost"
            size="icon"
            iconName="ChevronRight"
            onClick={() => {
              if (selectedMonth === 11) {
                setSelectedMonth(0);
                setSelectedYear(selectedYear + 1);
              } else {
                setSelectedMonth(selectedMonth + 1);
              }
            }}
          />
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          onClick={() => {
            setSelectedMonth(new Date()?.getMonth());
            setSelectedYear(new Date()?.getFullYear());
          }}
        >
          Today
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
            <div key={day} className="text-center text-xs font-medium text-text-secondary py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays?.map((dayData, index) => (
            <div
              key={index}
              className={`aspect-square p-1 text-sm border border-border rounded-lg ${
                dayData ? (
                  dayData?.isToday 
                    ? 'bg-accent/10 border-accent text-accent font-semibold'
                    : dayData?.isPast
                    ? 'text-text-secondary bg-muted/50' :'hover:bg-muted/50 spatial-transition' ) :''
              }`}
            >
              {dayData && (
                <div className="w-full h-full flex flex-col">
                  <span className="text-center mb-1">{dayData?.day}</span>
                  {dayData?.deliveries?.length > 0 && (
                    <div className="flex-1 flex flex-col space-y-1">
                      {dayData?.deliveries?.slice(0, 2)?.map((delivery, idx) => {
                        const status = getDeliveryStatus(delivery?.status);
                        return (
                          <div
                            key={idx}
                            className={`w-full h-2 rounded-full ${status?.color?.split(' ')?.[1]}`}
                            title={`${delivery?.itemName} - ${delivery?.status}`}
                          />
                        );
                      })}
                      {dayData?.deliveries?.length > 2 && (
                        <div className="text-xs text-center text-text-secondary">
                          +{dayData?.deliveries?.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Deliveries */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Upcoming Deliveries</h4>
        <div className="space-y-3">
          {upcomingDeliveries?.map((delivery) => {
            const status = getDeliveryStatus(delivery?.status);
            
            return (
              <div key={delivery?.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={delivery?.itemImage}
                    alt={delivery?.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h5 className="font-medium text-text-primary truncate">{delivery?.itemName}</h5>
                      <p className="text-sm text-text-secondary">{delivery?.room}</p>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${status?.color}`}>
                      <Icon name={status?.icon} size={12} />
                      <span>{delivery?.status?.charAt(0)?.toUpperCase() + delivery?.status?.slice(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-secondary">
                      {formatDeliveryDate(delivery?.scheduledDate)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {delivery?.trackingNumber && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="ExternalLink"
                          className="text-xs"
                        >
                          Track
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Calendar"
                        onClick={() => onRescheduleDelivery(delivery?.id)}
                        className="text-xs"
                      >
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Delivery Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">
              {deliveries?.filter(d => d?.status === 'scheduled')?.length}
            </div>
            <div className="text-xs text-text-secondary">Scheduled</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">
              {deliveries?.filter(d => d?.status === 'in-transit')?.length}
            </div>
            <div className="text-xs text-text-secondary">In Transit</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">
              {deliveries?.filter(d => d?.status === 'delivered')?.length}
            </div>
            <div className="text-xs text-text-secondary">Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-error">
              {deliveries?.filter(d => d?.status === 'delayed')?.length}
            </div>
            <div className="text-xs text-text-secondary">Delayed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryScheduler;