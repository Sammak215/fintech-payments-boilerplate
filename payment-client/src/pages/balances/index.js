import React from 'react';
import BalanceCard from 'elements/cards/balance-card';
import OutGoingCard from 'elements/cards/outgoing-card';
import IncomingCard from 'elements/cards/icoming-card';
import PageAuth from 'layout/page-auth';

export default function Balances() {
  return (
    <PageAuth>
      <div className="container mx-auto">
        <BalanceCard />
        <OutGoingCard />
        <IncomingCard />
      </div>
    </PageAuth>
  );
}
