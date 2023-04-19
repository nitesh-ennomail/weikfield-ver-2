import request from "../../shared/lib/request";

function getDistributorGrid({ userProfile, profile_details }) {
  return request({
    url: `/getDistributorGrid`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userProfile.token}`,
    },
    data: JSON.stringify({
      userId: profile_details.user_id,
      usertype: userProfile.usertype,
    }),
  });
}

const DistributorService = {
  getDistributorGrid,
};

export default DistributorService;
