export const idlFactory = ({ IDL }) => {
  const MenuItem = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'getAbout' : IDL.Func([], [IDL.Text], ['query']),
    'getMenu' : IDL.Func([], [IDL.Vec(MenuItem)], ['query']),
    'getPictures' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'makeReservation' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
