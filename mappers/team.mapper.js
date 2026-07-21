function formatMember(member) {
  const user = member?.user || member;

  return {
    id: user?._id || user,
    name: user?.name,
    email: user?.email,
    joinedAt: member?.joinedAt,
  };
}

function formatTeam(team) {
  return {
    id: team._id,
    name: team.name,
    members: team?.members?.map((member) => formatMember(member)) || [],
    description: team.description,
    createdBy: team.createdBy.name,
    createdAt: team.createdAt,
  };
}

module.exports = { formatTeam };
